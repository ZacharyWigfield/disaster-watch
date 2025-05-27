import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Disasters } from '../shared/model/disasters';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private disasterResultsSubject = new BehaviorSubject<Disasters[]>([]);
  disasterResults$ = this.disasterResultsSubject.asObservable();

  constructor(private http: HttpClient) { }
  serverURL = 'http://localhost:8080'

  getSearchResults(): Observable<any[]> {
    const url = `${this.serverURL}/api/disasters/search?lat=40.7128&lon=-74.0060&radius=50&types=flood,earthquake`
    return this.http.get<Disasters[]>(url).pipe(tap(results => this.disasterResultsSubject.next(results)))
  }
}
