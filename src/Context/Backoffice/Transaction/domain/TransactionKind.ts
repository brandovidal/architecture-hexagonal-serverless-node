import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { TransactionKindInvalid } from './TransactionKindInvalid'

export type TransactionKindValue = 'WALLET' | 'PAYMENT'
export enum TransactionKindType {
  WALLET = 'WALLET',
  PAYMENT = 'PAYMENT'
}

export class TransactionKind extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureIsValidKind(value)
  }

  private ensureIsValidKind (value: string): void {
    if (TransactionKindType[value as TransactionKindValue] === undefined) {
      throw new TransactionKindInvalid(`The transaction kind ${value} is not valid`)
    }
  }
}
