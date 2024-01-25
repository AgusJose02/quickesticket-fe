import { Ticket } from "./ticket-class.js";

export class Project {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public wiki: string,
    public creation_date: string,
    // public tickets: Ticket[]
  ) { }
}