import { Base } from './';

export class Food extends Base {
  constructor(
    public readonly name: string,
    public readonly brand: string | null,
    public readonly calories: number,
    public readonly protein: number,
    public readonly carbs: number,
    public readonly fat: number,
    public readonly servingSize: number,
    public readonly servingUnit: string,
    public readonly userUid: string,
  ) {
    super();
  }
}
