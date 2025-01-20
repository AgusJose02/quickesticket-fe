export class DevotedTime {
  constructor(
  public id: number | undefined,
  public ticket: number | undefined,
  public user: number | undefined,
  public date: Date,
  public description: string | undefined,
  public amount?: number,
  public client_time_amount?: number,
  ) { }
}