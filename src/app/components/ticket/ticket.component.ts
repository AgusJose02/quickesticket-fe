import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ticket } from '../../interfaces/ticket.js';
import { TicketService } from '../../services/ticket.service.js';
import { TicketDeletionService } from '../../services/ticket-deletion.service.js';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service.js';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  @Input() ticket?: Ticket;

  updateTicket = false;

  totalTime = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private ticketDeletionService: TicketDeletionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getTicket();
    this.toastService.showMessages();
  }

  onUpdate(): void {
    this.getTicket();
    this.messageService.add({severity: 'success', summary: 'Hecho!', detail: 'Ticket actualizado correctamente.'})
  }

  onCancel(): void {
    this.updateTicket = false;
  }

  setTotalTime(): void {
    if (this.ticket) {
      if (this.ticket.total_hours) {
        this.totalTime = this.ticket.total_hours;
      }
    }
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicket(id)
      .subscribe(ticket => {
        this.ticket = ticket;
        this.updateTicket = false; // para que al editar se oculte el formulario
        this.setTotalTime()
      })
  }

  // deleteTicket(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.ticketService.deleteTicket(id)
  //     .subscribe(() => {
  //       this.tikcetDeletionService.notifyTicketDeleted(id)
  //       this.location.back();
  //     });
  // }

  deleteTicket() {
    this.confirmationService.confirm({
      message: '¿Confirma que desea eliminar el ticket? Se perderá su tiempo dedicado.',
      accept: () => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.ticketService.deleteTicket(id)
          .subscribe(() => {
            this.ticketDeletionService.notifyTicketDeleted(id)
            this.toastService.addMessage({severity: 'success', summary: 'Hecho!', detail: 'Ticket eliminado correctamente.'})
            this.router.navigate(['/projects', this.ticket?.project.id])
          });
      }
    });
  }
}

