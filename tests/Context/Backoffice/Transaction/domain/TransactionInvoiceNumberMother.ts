import { TransactionInvoiceNumber } from 'src/Context/Backoffice/Transaction/domain/TransactionInvoiceNumber'
import { NumberMother } from 'tests/Context/Shared/domain/NumberMother'

export class TransactionInvoiceNumberMother {
  static create (value: number): TransactionInvoiceNumber {
    return new TransactionInvoiceNumber(value)
  }
  static random (): TransactionInvoiceNumber {
    return this.create(NumberMother.random({ min: 1, max: 1_000 }))
  }
}
