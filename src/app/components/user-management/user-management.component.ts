import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service.js';
import { User as UserClass } from '../../classes/user.js';

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
    private router: Router
  ){}

  model = new UserClass(
    null, //username
    null, //password
    false, //is_admin
  );

  onSubmit() {
    this.userService.addUser(this.model)
      .subscribe(data => {
        console.log('El usuario fue registrado correctamente.')
        this.router.navigate(['/home']) //TEMPORAL
      })
  }

  onCancel() {

  }
}
