import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development.js';
import { User as UserClass } from '../classes/user.js';

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
}
