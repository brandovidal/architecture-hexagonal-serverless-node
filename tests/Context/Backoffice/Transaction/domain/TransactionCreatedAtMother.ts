import { TransactionCreatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionCreatedAt'
import { DateMother } from 'tests/Context/Shared/domain/DateMother'

export class TransactionCreatedAtMother {
  static create (value: Date): TransactionCreatedAt {
    return new TransactionCreatedAt(value)
  }

  static random (): TransactionCreatedAt {
    return this.create(DateMother.random())
  }
}
