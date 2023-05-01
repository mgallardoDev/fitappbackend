import { Base, User } from './';

export class Role extends Base {
  constructor(public readonly name: string, public readonly users: User[]) {
    super();
  }
}
