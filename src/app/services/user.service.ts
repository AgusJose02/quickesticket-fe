import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.development.js';
import { User as UserClass } from '../classes/user.js';
import { User } from '../interfaces/user.js';
import { ErrorHandlerService } from './error-handler.service.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private env: any = environment
  
  private usersUrl = `${this.env.apiUrl}/users`

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  addUser(user: UserClass): Observable<any>{
    return this.http.post(`${this.usersUrl}`, user)
  }

  login(user: UserClass): Observable<string>{
    return this.http.post<string>(`${this.usersUrl}/login`, user)
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`

    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUsersWorkTime(year: number, month: number): Observable<any> {
    const url = `${this.usersUrl}/devoted-time?year=${year}&month=${month}`

    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched users work time`)),
      catchError(this.handleError<User>(`getUsersWorkTime`))
    );
  }

  updateUser(user: Partial<UserClass>, id: number): Observable<any> {
    const url = `${this.usersUrl}/${id}`

    return this.http.put<User>(url, user).pipe(
      tap(_ => console.log(`updated user id=${id}`))
    );
  }

  /** DELETE: delete the ticket from the server */
  deleteUser(id: number): Observable<UserClass> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<UserClass>(url).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<UserClass>('deleteTicket'))
    );
  } 

  // Handler de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      this.errorHandlerService.errorHandler(error)

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } 
}
