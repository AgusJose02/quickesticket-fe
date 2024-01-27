import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TicketState } from './ticket-state.js';

@Injectable({
  providedIn: 'root'
})
export class TicketStateService {
  private ticketStatesUrl = 'http://localhost:3000/api/ticket-states'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET tickets from the server */
  getTicketStates(): Observable<TicketState[]> {
    return this.http.get<TicketState[]>(this.ticketStatesUrl)
      .pipe(
        tap(_ => console.log('fetched ticketStates')),
        catchError(this.handleError<TicketState[]>('getTicketStates', []))
      );
  }

  // Handler de errores
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
