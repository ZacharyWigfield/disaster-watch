import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FloodEvent, FloodEventWithUserLocation, UserLocation } from '../shared/model/floodEventWithUserLocation';
import { SearchCriteria } from '../shared/model/searchCriteria';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly floodWarningsSubject = new BehaviorSubject<FloodEvent[]>([]);
  readonly floodWarningResults$ = this.floodWarningsSubject.asObservable();

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  readonly searchLoading$ = this.loadingSubject.asObservable();

  private readonly userLocationSubject = new BehaviorSubject<UserLocation>({ lat: 0, long: 0 })
  readonly userLocation$ = this.userLocationSubject.asObservable()

  constructor(private http: HttpClient) { }
  serverURL = 'http://localhost:8080'

  getFloodWarnings(searchCriteria: SearchCriteria): Observable<FloodEventWithUserLocation> {
    const url = `${this.serverURL}/api/disasters/floods/warnings`
    let params = new HttpParams()
      .set('searchLocation', searchCriteria.searchBar)
      .set('radius', searchCriteria.radiusPick.toString())
      .set('startDate', searchCriteria.dateRange[0].toISOString())
      .set('endDate', searchCriteria.dateRange[1].toISOString());
    for (const type of searchCriteria.disasterType) {
      params = params.append('eventType', type);
    }

    this.loadingSubject.next(true)

    return this.http.get<FloodEventWithUserLocation>(url, { params }).pipe(
      tap((results) => {
        this.floodWarningsSubject.next(results.floodEvents)
        this.userLocationSubject.next({ lat: results.userLat, long: results.userLong })
      }),
      finalize(() => this.loadingSubject.next(false)),
    )
  }

  getFloodEventByID(id: number): Observable<FloodEvent> {
    const url = `${this.serverURL}/api/disasters/floods/warnings/${id}`

    return this.http.get<FloodEvent>(url)
  }

}
