export class Base {
  constructor(
    public readonly uid: string,
    public readonly createdAt: Date,
    public readonly enabled: boolean,
  ) {}
}
