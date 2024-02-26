import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DevotedTime as DevotedTimeClass } from '../classes/devoted-time-class.js';
import { DevotedTime } from '../entities/devoted-time.js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevotedTimeService {
  private env: any = environment;

  private ticketUrl = `${this.env.apiUrl}/tickets`;
  private devotedTimeDir = 'devoted-time';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET project by id. Will 404 if id not found */
  getDevotedTime(id: number, ticketId: number): Observable<DevotedTime> {
    const url = `${this.ticketUrl}/${ticketId}/${this.devotedTimeDir}/${id}`;
    return this.http.get<DevotedTime>(url).pipe(
      tap(_ => console.log(`fetched devotedTime id=${id}`)),
      catchError(this.handleError<DevotedTime>(`getDevotedTime id=${id}`))
    );
  }

  /** GET devotedTimes from the server */
  getTicketsDevotedTime(ticketId: number): Observable<DevotedTime[]> {
    const url = `${this.ticketUrl}/${ticketId}/${this.devotedTimeDir}`;

    return this.http.get<DevotedTime[]>(url)
      .pipe(
        tap(_ => console.log('fetched devotedTime')),
        catchError(this.handleError<DevotedTime[]>('getTicketsDevotedTime', []))
      );
  }

  /** POST: add a new devotedTime to the server */
  addDevotedTime(time: DevotedTimeClass, ticketId: number): Observable<DevotedTimeClass> {
    const url = `${this.ticketUrl}/${ticketId}/${this.devotedTimeDir}`;

    return this.http.post<DevotedTimeClass>(url, time, this.httpOptions).pipe(
      tap(_ => console.log(`added devoted time to ticket id=${ticketId}`)),
      catchError(this.handleError<DevotedTimeClass>('addDevotedTime'))
    );
  }

  /** PUT: update the hero on the server */
  updateDevotedTime(timeEntry: DevotedTimeClass, ticketId: number): Observable<any> {
    const url = `${this.ticketUrl}/${ticketId}/${this.devotedTimeDir}/${timeEntry.id}`;

    return this.http.put(url, timeEntry, this.httpOptions).pipe(
      tap(_ => console.log(`updated project id=${timeEntry.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /** DELETE: delete the devotedTime from the server */
  deleteDevotedTime(id: number, ticketId: number): Observable<DevotedTime> {
    const url = `${this.ticketUrl}/${ticketId}/${this.devotedTimeDir}/${id}`;

    return this.http.delete<DevotedTime>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted devotedTime id=${id}`)),
      catchError(this.handleError<DevotedTime>('deleteDevotedTime'))
    );
  } 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } 

}
 