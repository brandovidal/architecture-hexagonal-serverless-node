import { TransactionUserCreated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserCreated'
import { EmailMother } from 'tests/Context/Shared/domain/EmailMother'

export class TransactionUserCreatedMother {
  static create (value: string): TransactionUserCreated {
    return new TransactionUserCreated(value)
  }

  static random (): TransactionUserCreated {
    return this.create(EmailMother.random())
  }
}
