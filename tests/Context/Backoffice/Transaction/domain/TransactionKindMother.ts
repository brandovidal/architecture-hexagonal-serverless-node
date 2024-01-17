import { TransactionKind, TransactionKindType } from 'src/Context/Backoffice/Transaction/domain/TransactionKind'

export class TransactionKindMother {
  static create (value: string): TransactionKind {
    return new TransactionKind(value)
  }

  static random (): TransactionKind {
    return this.create(Object.keys(TransactionKindType)[Math.floor(Math.random() * Object.keys(TransactionKindType).length)])
  }

  static invalidKind (): string {
    return 'INVALID'
  }
}
