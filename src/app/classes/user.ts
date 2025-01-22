export class User {
  constructor(
    public username: string,
    public password: string | undefined,
    public is_admin: boolean | undefined
  ) { }
}
