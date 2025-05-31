import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FlashFloodWarnings } from '../shared/model/flashFloodWarnings';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private floodWarningsSubject = new BehaviorSubject<FlashFloodWarnings[]>([])
  floodWarningResults$ = this.floodWarningsSubject.asObservable()

  constructor(private http: HttpClient) { }
  serverURL = 'http://localhost:8080'

  getFlashFloodWarnings(): Observable<FlashFloodWarnings[]> {
    const url = `${this.serverURL}/api/disasters/floods/warnings`
    return this.http.get<FlashFloodWarnings[]>(url).pipe(tap(results => this.floodWarningsSubject.next(results)))

  }
}
