import { Component } from '@angular/core';
import { UserService } from '../../services/user.service.js';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../services/error-handler.service.js';

import { User as UserClass } from '../../classes/user.js';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.js';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  secondPassword = null;

  currentUrl = this.route.snapshot.url[0].path;
  showPasswordFields: boolean = false
  title: string = 'Editar usuario'
  submitButtonLabel: string = 'Guardar cambios'
  
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
  ){}
  
  userToUpdate: User | undefined 
  model = new UserClass(
    '', //username
    undefined, //password
    false, //is_admin
  );
  
  ngOnInit(): void {

    if (this.currentUrl === 'new-user') {
      this.showPasswordFields = true
      this.title = 'Crear nuevo usuario'
      this.submitButtonLabel = 'Registrar'
    } else {
      this.getUser()
    } 
  }
  
  getUser(): void {
    const userId = Number(this.route.snapshot.url[1].path)
    this.userService.getUser(userId)
      .subscribe(user => {
        this.userToUpdate = user
        this.model.username = user.username
        this.model.is_admin = Boolean(user.is_admin)
      })
  }

  onSubmit() {
    this.model.username = this.model.username.toLowerCase()

    if (this.currentUrl === 'new-user') {
      
      this.userService.addUser(this.model).subscribe({
        next: (v) => {
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

    } else {

      const userId = Number(this.route.snapshot.url[1].path)
      let payload
      
      payload = this.getModifiedFields()
      if (!payload) {
        this.messageService.add({
          severity: 'error',
          summary: 'El usuario no fue modificado',
          detail: `Realiza cambios al usuario antes de guardar.`})
      return
      }

      this.userService.updateUser(payload, userId).subscribe({
        next: (v) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario actualizado',
            detail: `El usuario ${this.model.username} fue actualizado correctamente.`})
            this.router.navigate(['management/users'])
          },
          error: (e: HttpErrorResponse) => {
            this.errorHandlerService.errorHandler(e)
          },
          complete: () => console.info('complete')
      })
    } 
  }

  // Validación de que el usuario fue modificado
  private getModifiedFields(): Partial<UserClass> | null {
    const modifiedFields: Partial<UserClass> = {}
    let modelPristine = true

    if (this.userToUpdate?.username.toLowerCase() !== this.model.username.toLowerCase()) {
      modifiedFields.username = this.model.username
      modelPristine = false
    }

    if (this.userToUpdate?.is_admin !== this.model.is_admin) {
      modifiedFields.is_admin = this.model.is_admin
      modelPristine = false
    }

    if (this.showPasswordFields && this.model.password) {
      modifiedFields.password = this.model.password;
      modelPristine = false
    }

    if (modelPristine) {
      return null
    } else {
      return modifiedFields;
    }

}

}
