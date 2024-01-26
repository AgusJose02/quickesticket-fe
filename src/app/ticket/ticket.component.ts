import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Ticket } from '../ticket.js';
import { TicketService } from '../ticket.service.js';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  @Input() ticket?: Ticket;
    
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
  ) { }

  ngOnInit(): void {
    this.getTicket()
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicket(id)
      .subscribe(ticket => this.ticket = ticket)
  }
}
