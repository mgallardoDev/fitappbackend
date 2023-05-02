import { Base, User } from './';

export class Food extends Base {
  constructor(
    public readonly uid: string,
    public readonly createdAt: Date,
    public readonly enabled: boolean,
    public readonly name: string,
    public readonly brand: string | null,
    public readonly calories: number,
    public readonly protein: number,
    public readonly carbs: number,
    public readonly fat: number,
    public readonly servingSize: number,
    public readonly servingUnit: string,
    public readonly user: User | null,
  ) {
    super(uid, createdAt, enabled);
  }
}
