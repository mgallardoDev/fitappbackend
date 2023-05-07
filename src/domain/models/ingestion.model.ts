import { User } from 'src/modules/user';
import { Base, Food, Meal } from '.';

export class Ingesta extends Base {
  food: Food;
  amount: number;
  user: User;
  meal: Meal;
  date: Date;
}
