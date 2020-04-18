import { UNIT } from './unit.enum';

export class ProductType {
  constructor(public id: number, public name: string, public unit: UNIT) {}
}
