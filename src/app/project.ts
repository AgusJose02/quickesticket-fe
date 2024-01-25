import { Ticket } from "./ticket.js";

export interface Project {
  id: number;
  name: string;
  description: string;
  wiki: string;
  creation_date: string;
  tickets: Ticket[];
}