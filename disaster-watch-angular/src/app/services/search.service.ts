import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FloodEvent, FloodEventWithUserLocation, UserLocation } from '../shared/model/floodEventWithUserLocation';
import { SearchCriteria, SearchCriteriaFormGroup } from '../shared/model/searchCriteria';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DISASTER_TYPES } from '../shared/constants/disaster-types.constant';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly serverURL = 'http://localhost:8080'

  readonly floodEvents = signal<FloodEvent[]>([]);
  readonly userLocation = signal<UserLocation>({ lat: undefined, long: undefined })
  readonly isLoading = signal(false);

  private readonly today = new Date();
  private readonly oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  private readonly _form: SearchCriteriaFormGroup = new FormGroup({
    searchBar: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    radiusPick: new FormControl<number>(100, { nonNullable: true }),
    disasterType: new FormControl<string[]>(DISASTER_TYPES, { nonNullable: true }),
    dateRange: new FormControl<[Date, Date]>([this.oneWeekAgo, this.today], { nonNullable: true })
  });

  constructor(private http: HttpClient) {
  }

  get searchForm(): SearchCriteriaFormGroup {
    return this._form;
  }

  getFloodEvents(searchCriteria: SearchCriteria): void {
    const url = `${this.serverURL}/api/disasters/floods/events`
    let params = new HttpParams()
      .set('searchLocation', searchCriteria.searchBar)
      .set('radius', searchCriteria.radiusPick.toString())
      .set('startDate', searchCriteria.dateRange[0].toISOString())
      .set('endDate', searchCriteria.dateRange[1].toISOString());
    for (const type of searchCriteria.disasterType) {
      params = params.append('eventType', type);
    }

    this.isLoading.set(true)

    this.http.get<FloodEventWithUserLocation>(url, { params }).pipe(
      tap((results) => {
        this.floodEvents.set(results.floodEvents)
        this.userLocation.set({ lat: results.userLat, long: results.userLong })
      }),
      finalize(() => this.isLoading.set(false)),
    ).subscribe({
      error: () => { },
    })
  }

  getFloodEventByID(id: number): Observable<FloodEvent> {
    const url = `${this.serverURL}/api/disasters/floods/events/${id}`
    return this.http.get<FloodEvent>(url)
  }

  getIntersectingEventsWithinYear(id: number): Observable<FloodEvent[]> {
    const url = `${this.serverURL}/api/disasters/floods/events/intersecting/${id}`
    return this.http.get<FloodEvent[]>(url)
  }

}
