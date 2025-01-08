import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User as UserClass } from '../../classes/user.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private router: Router
  ){}

  model = new UserClass(
    null, //username
    null, //password
    null, //is_admin
  );

  onSubmit() {
    this.router.navigate(['/home'])
  }
}
