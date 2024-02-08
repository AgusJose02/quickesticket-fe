import { Component, Input } from '@angular/core';

import { Project } from '../project.js';
import { Ticket } from '../ticket.js';
import { TicketState } from '../ticket-state.js';
import { TicketStateService } from '../ticket-state.service.js';
import { TicketFilter } from '../ticket-filter.js';
import { TicketDeletionService } from '../ticket-deletion.service.js';
import { Message } from 'primeng/api/message.js';


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

  messages: Message[] = []

  constructor (
    private ticketStateService: TicketStateService,
    private ticketDeletionService: TicketDeletionService,
    private ticketFilter: TicketFilter
  ) { }

  ngOnInit(): void {
    this.getTicketStates();
    this.subscribeToTicketDeletions();
    
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

  private subscribeToTicketDeletions(): void {
    this.ticketDeletionService.onTicketDeletion()
      .subscribe((deletedTicketId: number) => {
        this.tickets = this.tickets.filter(ticket => ticket.id !== deletedTicketId);
        this.filteredTickets = this.filteredTickets.filter(ticket => ticket.id !== deletedTicketId);
        this.messages.push({severity:'info', summary:'Info Message', detail:'Ticket eliminado correctamente'})
      });
  }
}
