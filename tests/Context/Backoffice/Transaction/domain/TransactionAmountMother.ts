import { TransactionAmount } from "src/Context/Backoffice/Transaction/domain/TransactionAmount";
import { NumberMother } from "tests/Context/Shared/domain/NumberMother";

export class TransactionAmountMother {
  static create (value: number) {
    return new TransactionAmount(value)
  }

  static random (): TransactionAmount {
    return this.create(NumberMother.random({ min: 1, max: 1_000 }))
  }
}
