import { TransactionUserUpdated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserUpdated'
import { EmailMother } from 'tests/Context/Shared/domain/EmailMother'

export class TransactionUserUpdatedMother {
  static create (value: string): TransactionUserUpdated {
    return new TransactionUserUpdated(value)
  }

  static random (): TransactionUserUpdated {
    return this.create(EmailMother.random())
  }
}
