import { Base, Food, Meal, Role, UserGoal } from 'src/domain/models';

export class User extends Base {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: Role,
    public readonly uid?: string | null,
    public readonly createdAt?: Date | null,
    public readonly enabled?: boolean | null,
    public ownFoods?: Food[],
    public ownMeals?: Meal[],
    public goals?: UserGoal[],
  ) {
    super(uid, createdAt, enabled);
    this.ownFoods = this.ownFoods ?? [];
    this.ownMeals = this.ownMeals ?? [];
    this.goals = this.goals ?? [];
  }
}
