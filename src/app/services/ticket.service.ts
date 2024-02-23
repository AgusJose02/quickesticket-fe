import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ticket } from '../entities/ticket.js';
import { Ticket as TicketClass } from '../classes/ticket-class.js';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsUrl = 'http://localhost:3000/api/tickets'
  private newTicketSubject = new Subject<TicketClass>();

  newProject$ = this.newTicketSubject.asObservable(); // para que al crear nuevo proyecto se redirija a su página

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET tickets from the server */
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketsUrl)
      .pipe(
        tap(_ => console.log('fetched tickets')),
        catchError(this.handleError<Ticket[]>('getTickets', []))
      );
  }

  /** GET ticket by id. Will 404 if id not found */
  getTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    
    return this.http.get<Ticket>(url).pipe(
      tap(_ => console.log(`fetched ticket id=${id}`)),
      catchError(this.handleError<Ticket>(`getTicket id=${id}`))
    );
  }

  /** POST: add a new ticket to the server */
  addTicket(ticket: TicketClass): Observable<TicketClass> {
    return this.http.post<TicketClass>(this.ticketsUrl, ticket, this.httpOptions).pipe(
      tap((newTicket: TicketClass) => this.newTicketSubject.next(newTicket)),
      catchError(this.handleError<TicketClass>('addTicket'))
    );
  }

  updateTicket(ticket: TicketClass): Observable<any> {
    const url = `${this.ticketsUrl}/${ticket.id}`;

    return this.http.put(url, ticket, this.httpOptions).pipe(
      tap(_ => console.log(`updated ticket id=${ticket.id}`)),
      catchError(this.handleError<any>('updateTicket'))
    );
  }

  /** DELETE: delete the ticket from the server */
  deleteTicket(id: number): Observable<TicketClass> {
    const url = `${this.ticketsUrl}/${id}`;

    return this.http.delete<TicketClass>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted ticket id=${id}`)),
      catchError(this.handleError<TicketClass>('deleteTicket'))
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
