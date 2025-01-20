import { Component } from '@angular/core';

import { Ticket } from '../../interfaces/ticket.js';
import { TicketState } from '../../interfaces/ticket-state.js';
import { TicketService } from '../../services/ticket.service.js';
import { TicketStateService } from '../../services/ticket-state.service.js';
import { TicketFilter } from '../../providers/ticket-filter.js';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.scss'
})
export class MyPageComponent {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  ticketStates: TicketState[] = [];
  selectedTicketStates: number[] = [1, 2, 3, 4];

  constructor(
    private ticketService: TicketService,
    private ticketStateService: TicketStateService,
    private ticketFilter: TicketFilter,
  ) { }

  ngOnInit(): void {
    this.getTickets();
    this.getTicketStates();
  }  

  getTickets(): void {
    this.ticketService.getTickets()
      .subscribe(tickets => {
        this.tickets = tickets
        this.filterTickets();
      });
  }

  getTicketStates(): void {
    this.ticketStateService.getTicketStates()
      .subscribe(ticketStates => this.ticketStates = ticketStates);
  }

  filterTickets(): void {
    this.filteredTickets = this.ticketFilter.assignFilteredTickets(
      this.tickets,
      this.filteredTickets,
      this.selectedTicketStates
    );
  }

}
