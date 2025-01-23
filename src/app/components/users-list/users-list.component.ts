import { Component } from '@angular/core';
import { UserService } from '../../services/user.service.js';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users: any[] = []

  date = new Date
  mes =  this.date.getMonth() + 1 
  anio = this.date.getFullYear()
  formIsValid = true

  constructor(
    private router: Router,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUsersWorkTime()
  }

  getUsersWorkTime(): void {
    this.userService.getUsersWorkTime(this.date.getFullYear(), this.date.getMonth() + 1)
      .subscribe(usersWT => {this.users = usersWT});
  }

  updateUser(id: number): void {
    this.router.navigate(['management/update-user', id]);
  }

  deleteUser(id: number): void {
    this.confirmationService.confirm({
      message: '¿Confirma que desea eliminar al usuario?',
      accept: () => {
        this.userService.deleteUser(id)
          .subscribe(() => this.deleteUserFromArray(id));
        this.messageService.add({severity: 'success', summary: 'Hecho!', detail: 'Usuario eliminado correctamente.'});
      }
    });
  }

  deleteUserFromArray(id: number): void {
    this.users = this.users.filter( user => user.id !== id);
  }

  onDateChange(): void {
    this.formIsValid = true
  }

  onSubmit(): void {
    this.getUsersWorkTime()
    this.mes =  this.date.getMonth() + 1 
    this.anio = this.date.getFullYear()
    this.formIsValid = false
  }
}
