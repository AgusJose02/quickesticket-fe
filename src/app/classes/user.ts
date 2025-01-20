export class User {
  constructor(
    public username: string,
    public password: string | null,
    public is_admin: boolean | null
  ) { }
}
