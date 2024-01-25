import { Project } from "./project-class.js";

export class Ticket {
  constructor(
    public id: number,
    public project: Project,
    public creator: number,
    public responsible: number,
    public beginning_date: string,
    public end_date: string,
    public state: number,
    public title: string,
    public description: string,
  ) { }
}