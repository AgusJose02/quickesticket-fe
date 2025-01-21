import { HttpErrorResponse } from '@angular/common/http/index.js';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router,
  ) { }

  errorHandler(e: HttpErrorResponse) {
  if (e.error.message){
    this.messageService.add({severity: 'error', summary: 'Error', detail: e.error.message})
    if (e.status === 401) {
      this.router.navigate(['/login'])
    } else if (e.status === 403) {
      this.router.navigate(['/home'])
    }

  } else {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Comuníquese con el administrador de la página.'})
  }
}
}
