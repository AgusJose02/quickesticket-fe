import { Ticket } from "./ticket-class.js";

export class Project {
  constructor(
    public id: number,
    public name: string | null | undefined,
    public description: string | null | undefined,
    public wiki: string | null | undefined,
    public creation_date: string | null | undefined,
    public hourly_rate: number | undefined
  ) { }
}