import { Component, Input } from '@angular/core';

import { Project } from '../project.js';
import { Ticket } from '../ticket.js';
import { TicketState } from '../ticket-state.js';
import { TicketStateService } from '../ticket-state.service.js';
import { TicketFilter } from '../ticket-filter.js';


@Component({
  selector: 'app-project-tickets',
  templateUrl: './project-tickets.component.html',
  styleUrl: './project-tickets.component.scss'
})
export class ProjectTicketsComponent {
  @Input() project?: Project;

  tickets: Ticket[] = []
  filteredTickets: Ticket[] = [];

  ticketStates: TicketState[] = [];
  selectedTicketStates: number[] = [1, 2, 3, 4];

  constructor (
    private ticketStateService: TicketStateService,
    private ticketFilter: TicketFilter
  ) { }

  ngOnInit(): void {
    this.getTicketStates();
    
    if(this.project) {
      this.tickets = this.project?.tickets
      this.filterTickets();
    }
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
