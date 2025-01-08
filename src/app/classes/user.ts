export class User {
  constructor(
    public id: number,
    public username: string | null,
    public password: string | null,
    public is_admin: number | null
  ) { }
}
