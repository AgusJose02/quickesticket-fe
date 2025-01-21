import { Component } from '@angular/core';
import { UserService } from '../../services/user.service.js';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../services/error-handler.service.js';

import { User as UserClass } from '../../classes/user.js';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  secondPassword = null;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ){}

  model = new UserClass(
    '', //username
    null, //password
    false, //is_admin
  );

  onSubmit() {
    this.model.username = this.model.username.toLowerCase()
    this.userService.addUser(this.model).subscribe({
      next: (v) => {
        console.log('El usuario fue registrado correctamente.')
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario registrado',
          detail: `El usuario ${this.model.username} fue registrado correctamente.`})
          this.router.navigate(['management/users'])
      },
      error: (e: HttpErrorResponse) => {
        this.errorHandlerService.errorHandler(e)
      },
      complete: () => console.info('complete')
    })
  }

}
