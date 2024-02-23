import { Ticket } from './ticket.js'

export interface DevotedTime {
  id: number;
  ticket: Ticket;
  date: Date;
  amount: number;
  description: string;
  client_time_amount: number;
  }