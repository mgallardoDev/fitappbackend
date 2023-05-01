import { Base, User } from '.';

export class UserGoal extends Base {
  constructor(
    public readonly date: Date,
    public readonly kcal: number,
    public readonly protein: number,
    public readonly carbohydrates: number,
    public readonly fat: number,
    public readonly user: User,
  ) {
    super();
  }
}
