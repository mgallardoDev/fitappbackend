import { Base, User } from '.';

export class Meal extends Base {
  constructor(
    public readonly uid: string,
    public readonly createdAt: Date,
    public readonly enabled: boolean,
    public readonly name: string,
    public readonly user: User | null,
  ) {
    super(uid, createdAt, enabled);
  }
}
