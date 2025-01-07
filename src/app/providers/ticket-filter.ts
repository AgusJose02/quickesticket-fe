import { Ticket } from "../interfaces/ticket.js";

export class TicketFilter {

  assignFilteredTickets(tickets: Ticket[], filteredTickets: Ticket[], states: number[]): Ticket[] {
    filteredTickets = this.filterTickets(tickets, states);
    filteredTickets.sort((a,b) => b.id - a.id);
    return filteredTickets;
  }

  filterTickets(tickets: Ticket[], states: number[]): Ticket[] {
    return tickets.filter(ticket => states.includes(ticket.state.id));
  }
 }
  
