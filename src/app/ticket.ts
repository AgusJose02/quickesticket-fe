import { Project } from "./project.js";

export interface Ticket {
  id: number;
  project: Project;
  creator: number;
  responsible: number;
  beginning_date: string;
  end_date: string;
  state: number;
  title: string;
  description: string;
  }