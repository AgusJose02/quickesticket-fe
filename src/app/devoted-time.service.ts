import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DevotedTime as DevotedTimeClass } from './devoted-time-class.js';


@Injectable({
  providedIn: 'root'
})
export class DevotedTimeService {
  private ticketUrl = 'http://localhost:3000/api/tickets';
  private devotedTimeDir = 'devoted-time';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** POST: add a new devotedTime to the server */
  addDevotedTime(time: DevotedTimeClass, ticketId: number): Observable<DevotedTimeClass> {
    const url = `${this.ticketUrl}/${ticketId}/${this.devotedTimeDir}`
    return this.http.post<DevotedTimeClass>(url, time, this.httpOptions).pipe(
      tap(_ => console.log(`added devoted time to ticket id=${ticketId}`)),
      catchError(this.handleError<DevotedTimeClass>('addDevotedTime'))
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
 