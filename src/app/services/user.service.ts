import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.development.js';
import { User as UserClass } from '../classes/user.js';
import { User } from '../interfaces/user.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private env: any = environment
  
  private usersUrl = `${this.env.apiUrl}/users`

  constructor(
    private http: HttpClient
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
