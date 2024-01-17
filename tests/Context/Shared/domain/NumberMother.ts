import { MotherCreator } from "./MotherCreator";

export class NumberMother {
  static random ({ min = 0, max }: { min?: number; max: number }): number {
    return MotherCreator.random().number.float({ min, max })
  }
}
