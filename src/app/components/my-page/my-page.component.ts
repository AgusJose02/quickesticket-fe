import { Component } from '@angular/core';

import { Ticket } from '../../entities/ticket.js';
import { TicketState } from '../../entities/ticket-state.js';
import { TicketService } from '../../services/ticket.service.js';
import { TicketStateService } from '../../services/ticket-state.service.js';
import { TicketFilter } from '../../providers/ticket-filter.js';
import { TicketDeletionService } from '../../services/ticket-deletion.service.js';
import { Message } from 'primeng/api/message.js';

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

  messages: Message[] = [];

  constructor(
    private ticketService: TicketService,
    private ticketStateService: TicketStateService,
    private ticketFilter: TicketFilter,
    private ticketDeletionService: TicketDeletionService,

  ) { }

  ngOnInit(): void {
    this.getTickets();
    this.getTicketStates();
    this.subscribeToTicketDeletions(); // NO FUNCIONA
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

        this.messages.push({severity:'info', summary:'Info Message', detail:'Ticket eliminado correctamente'})
      });
  }

}
