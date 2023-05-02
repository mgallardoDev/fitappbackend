import { Base, User } from '.';

export class UserGoal extends Base {
  constructor(
    public readonly uid: string,
    public readonly createdAt: Date,
    public readonly enabled: boolean,
    public readonly date: Date,
    public readonly kcal: number,
    public readonly protein: number,
    public readonly carbohydrates: number,
    public readonly fat: number,
    public readonly user: User,
  ) {
    super(uid, createdAt, enabled);
  }
}
