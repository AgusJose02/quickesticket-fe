export class User {
  constructor(
    public username: string | null,
    public password: string | null,
    public is_admin: boolean | null
  ) { }
}
