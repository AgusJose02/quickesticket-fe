import { Component, Input } from '@angular/core';

import { Project } from '../../interfaces/project.js';
import { Ticket } from '../../interfaces/ticket.js';
import { TicketState } from '../../interfaces/ticket-state.js';
import { TicketStateService } from '../../services/ticket-state.service.js';
import { TicketFilter } from '../../providers/ticket-filter.js';
import { TicketDeletionService } from '../../services/ticket-deletion.service.js';
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
    
    if(this.project) {
      this.tickets = this.project?.tickets
      this.subscribeToTicketDeletions(); // NO FUNCIONA
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
        // this.tickets = this.tickets.filter(ticket => ticket.id !== deletedTicketId);
        // this.filteredTickets = this.filteredTickets.filter(ticket => ticket.id !== deletedTicketId);

        let index = this.tickets.findIndex(x => x.id == deletedTicketId);
        if (index != -1)
          {
            this.tickets.splice(index, 1);
            this.tickets = [...this.filteredTickets];
          }

        this.messages.push({severity:'success', summary:'Info Message', detail:'Ticket eliminado correctamente'})
      });
  }
}
