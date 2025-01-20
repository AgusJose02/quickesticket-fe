import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/index.js';

import { User as UserClass } from '../../classes/user.js';
import { UserService } from '../../services/user.service.js';
import { ErrorHandlerService } from '../../services/error-handler.service.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ){}

  model = new UserClass(
    '', //username
    null, //password
    null, //is_admin
  );

  onSubmit() {
    this.model.username = this.model.username.toLowerCase()
    this.userService.login(this.model).subscribe({
      next: (token) => {
        this.router.navigate(['/home'])
        localStorage.setItem('token', token)
      },
      error: (e: HttpErrorResponse) => {
        this.errorHandlerService.errorHandler(e)
      }
    })
  }


}
