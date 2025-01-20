import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() title?: string;

  token = localStorage.getItem('token')
  username = this.authService.getPayloadField(this.token, 'username')

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
