import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FloodWarnings } from '../shared/model/floodWarnings';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private floodWarningsSubject = new BehaviorSubject<FloodWarnings[]>([])
  floodWarningResults$ = this.floodWarningsSubject.asObservable()

  constructor(private http: HttpClient) { }
  serverURL = 'http://localhost:8080'

  getFloodWarnings(): Observable<FloodWarnings[]> {
    const url = `${this.serverURL}/api/disasters/floods/warnings`
    return this.http.get<FloodWarnings[]>(url).pipe(tap(results => this.floodWarningsSubject.next(results)))
  }
}
