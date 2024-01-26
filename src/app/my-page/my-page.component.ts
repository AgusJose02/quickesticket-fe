import { Component } from '@angular/core';
import { Ticket } from '../ticket.js';
import { TicketService } from '../ticket.service.js';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.scss'
})
export class MyPageComponent {
  tickets: Ticket[] = []

  constructor(private ticketService: TicketService) { }

  getTickets(): void {
    this.ticketService.getTickets()
      .subscribe(tickets => this.tickets = tickets);
  }

  ngOnInit(): void {
    this.getTickets();
  }
}
