import { User } from "./user.js";
import { Project } from "./project.js";
import { TicketState } from "./ticket-state.js";

export interface Ticket {
  id: number;
  project: Project;
  creator: User;
  responsible: User | null;
  beginning_date: string;
  end_date: string;
  state: TicketState;
  total_time: number;
  title: string;
  description: string;
  }