export class Ticket {
  constructor(
    public id: number,
    public project: number | undefined,
    public creator: number,
    public responsible: number | null,
    public beginning_date: string,
    public end_date: string | null,
    public state: number | undefined,
    public total_time: number,
    public title: string,
    public description: string | null,
  ) { }
}