import { Base, Food, Meal, User } from '.';

export class Ingesta extends Base {
  food: Food;
  amount: number;
  user: User;
  meal: Meal;
  date: Date;
}
