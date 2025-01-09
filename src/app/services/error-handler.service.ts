import { HttpErrorResponse } from '@angular/common/http/index.js';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
  ) { }

  errorHandler(e: HttpErrorResponse) {
  if(e.error.msg){
    this.messageService.add({severity: 'error', summary: 'Error', detail: e.error.msg})
  } else {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Comuníquese con el administrador de la página.'})
  }
}
}
