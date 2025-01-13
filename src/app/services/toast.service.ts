import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private pendingMessages: any[] = [];

  constructor(private messageService: MessageService) { }


  addMessage(message: any) {
    this.pendingMessages.push(message);
  }


  showMessages() {
    this.pendingMessages.forEach((message) => {
      this.messageService.add(message)
    })
    // Limpia los mensajes después de mostrarlos
    this.pendingMessages = []
  }
}
