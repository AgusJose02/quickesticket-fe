import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { Ticket } from '../ticket.js';
import { TicketService } from '../ticket.service.js';
import { OutgoingMessage } from 'http';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  @Input() ticket?: Ticket;

  @Output()  ticketDeleted = new EventEmitter<number>();

  updateTicket = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
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

  goBack(): void {
    this.router.navigate(['/projects', this.ticket?.project.id],)
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicket(id)
      .subscribe(ticket => {
        this.ticket = ticket;
        this.updateTicket = false; // para que al editar se oculte el formulario
      })
  }

  deleteTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.deleteTicket(id)
      .subscribe(() => {
        this.goBack(); //TODO: La tabla de tickets no aparece
        this.ticketDeleted.emit(id); // TODO: Eliminar el ticket del array del listado de tickets en la pag anterior
      });
  }

}
