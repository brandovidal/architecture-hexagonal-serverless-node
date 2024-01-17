import { TransactionUpdatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionUpdatedAt'
import { DateMother } from 'tests/Context/Shared/domain/DateMother'

export class TransactionUpdatedAtMother {
  static create (value: Date): TransactionUpdatedAt {
    return new TransactionUpdatedAt(value)
  }

  static random (): TransactionUpdatedAt {
    return this.create(DateMother.random())
  }
}
