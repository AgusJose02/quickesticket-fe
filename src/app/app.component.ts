import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'QuickesTicket';
  showNavbar = true;

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    //Ocultar la navbar si estoy en el login
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/login';
    });
  }

}
