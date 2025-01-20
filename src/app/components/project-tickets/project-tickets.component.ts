import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Project } from '../../interfaces/project.js';
import { Ticket } from '../../interfaces/ticket.js';
import { TicketState } from '../../interfaces/ticket-state.js';
import { TicketStateService } from '../../services/ticket-state.service.js';
import { TicketFilter } from '../../providers/ticket-filter.js';


@Component({
  selector: 'app-project-tickets',
  templateUrl: './project-tickets.component.html',
  styleUrl: './project-tickets.component.scss'
})
export class ProjectTicketsComponent implements OnChanges {
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
  }

  // cuando project llega en el @Input, se cargan los tickets
  ngOnChanges(changes: SimpleChanges): void {
    const loadedProject = changes['project'].currentValue
    if (loadedProject) {
      this.tickets = loadedProject.tickets
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
