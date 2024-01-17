import { TransactionTotal } from "src/Context/Backoffice/Transaction/domain/TransactionTotal";
import { NumberMother } from "tests/Context/Shared/domain/NumberMother";

export class TransactionTotalMother {
  static create (value: number) {
    return new TransactionTotal(value)
  }

  static random (): TransactionTotal {
    return this.create(NumberMother.random({ min: 1, max: 1_000 }))
  }
}
