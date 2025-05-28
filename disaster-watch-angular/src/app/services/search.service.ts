import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Disasters } from '../shared/model/disasters';
import { FlashFloodWarnings } from '../shared/model/flashFloodWarnings';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private disasterResultsSubject = new BehaviorSubject<Disasters[]>([]);
  disasterResults$ = this.disasterResultsSubject.asObservable();

  private floodWarningsSubject = new BehaviorSubject<FlashFloodWarnings[]>([])
  floodWarningResults$ = this.floodWarningsSubject.asObservable()

  constructor(private http: HttpClient) { }
  serverURL = 'http://localhost:8080'

  getSearchResults(): Observable<Disasters[]> {
    const url = `${this.serverURL}/api/disasters/search?lat=40.7128&lon=-74.0060&radius=50&types=flood,earthquake`
    return this.http.get<Disasters[]>(url).pipe(tap(results => this.disasterResultsSubject.next(results)))
  }

  getFlashFloodWarnings(): Observable<FlashFloodWarnings[]> {
    const url = `${this.serverURL}/api/disasters/floods/warnings`
    return this.http.get<FlashFloodWarnings[]>(url).pipe(tap(results => this.floodWarningsSubject.next(results)))

  }
}
