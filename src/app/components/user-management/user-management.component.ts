import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import { MessageService } from 'primeng/api';

import { UserService } from '../../services/user.service.js';
import { User as UserClass } from '../../classes/user.js';
import { ErrorHandlerService } from '../../services/error-handler.service.js';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  secondPassword = null;
  // isAdmin = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
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
      },
      error: (e: HttpErrorResponse) => {
        this.errorHandlerService.errorHandler(e)
      },
      complete: () => console.info('complete')
    })
  }

  onCancel() {

  }

}
