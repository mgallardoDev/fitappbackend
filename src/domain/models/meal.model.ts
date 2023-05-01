import { Base, User } from '.';

export class Meal extends Base {
  constructor(public readonly name: string, public readonly user: User | null) {
    super();
  }
}
