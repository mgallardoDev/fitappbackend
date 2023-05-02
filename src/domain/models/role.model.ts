import { Base } from './';

export class Role extends Base {
  constructor(
    public readonly uid: string,
    public readonly createdAt: Date,
    public readonly enabled: boolean,
    public readonly name: string,
  ) {
    super(uid, createdAt, enabled);
  }
}
