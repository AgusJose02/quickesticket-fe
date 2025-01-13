import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() title?: string;

  constructor(
    private router: Router,
  ) {}

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
