import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ticket } from '../ticket.js';
import { TicketService } from '../ticket.service.js';
import { TicketDeletionService } from '../ticket-deletion.service.js';
import { ConfirmationService } from 'primeng/api';

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
    private tikcetDeletionService: TicketDeletionService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getTicket();
  }

  onUpdate(): void {
    
    this.getTicket();
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
            this.tikcetDeletionService.notifyTicketDeleted(id)
            this.router.navigate(['/projects', this.ticket?.project.id])
          });
      }
    });
  }
}

