import { Project } from "./project.js";
import { TicketState } from "./ticket-state.js";

export interface Ticket {
  id: number;
  project: Project;
  creator: number;
  responsible: number;
  beginning_date: string;
  end_date: string;
  state: TicketState;
  total_hours: number;
  title: string;
  description: string;
  }