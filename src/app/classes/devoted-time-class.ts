export class DevotedTime {
  constructor(
  public id: number,
  public ticket: number | undefined,
  public date: Date,
  public description: string,
  public amount?: number,
  public client_time_amount?: number,
  ) { }
}