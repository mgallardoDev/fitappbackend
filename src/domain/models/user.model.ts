import { Base, Food, Meal, Role, UserGoal } from '.';

export class User extends Base {
  constructor(
    public readonly uid: string,
    public readonly createdAt: Date,
    public readonly enabled: boolean,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role,
    public readonly ownFoods: Food[],
    public readonly ownMeals: Meal[],
    public readonly goals: UserGoal[],
  ) {
    super(uid, createdAt, enabled);
  }
}
