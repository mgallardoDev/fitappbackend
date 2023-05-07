import { Base } from '../../../../domain/models';

export class Role extends Base {
  constructor(
    public readonly name: string,
    public readonly uid?: string,
    public readonly createdAt?: Date,
    public readonly enabled?: boolean,
  ) {
    super(uid, createdAt, enabled);
  }
}
