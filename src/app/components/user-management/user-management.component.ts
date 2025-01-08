import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User as UserClass } from '../../classes/user.js';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  secondPassword = null;

  constructor(
    private router: Router
  ){}

  model = new UserClass(
    0, //id
    null, //username
    null, //password
    null, //is_admin
  );

  onSubmit() {

  }

  onCancel() {

  }
}
