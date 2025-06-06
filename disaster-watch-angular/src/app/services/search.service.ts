import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FloodWarnings } from '../shared/model/floodWarnings';
import { SearchCriteria } from '../shared/model/searchCriteria';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private floodWarningsSubject = new BehaviorSubject<FloodWarnings[]>([]);
  floodWarningResults$ = this.floodWarningsSubject.asObservable();

  loadingSubject = new BehaviorSubject<boolean>(false);
  searchLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }
  serverURL = 'http://localhost:8080'

  getFloodWarnings(searchCriteria: SearchCriteria): Observable<FloodWarnings[]> {
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

    return this.http.get<FloodWarnings[]>(url, { params }).pipe(
      tap(results => {
        this.floodWarningsSubject.next(results)
        this.loadingSubject.next(false)
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        return throwError(() => error)
      })
    )
  }
}
