import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject'
import { TransactionAmountZero } from './TransactionAmountZero'

export class TransactionAmount extends NumberValueObject {
  constructor (value: number) {
    super(value)
    this.ensureIsMoreThanZero(value)
  }

  private ensureIsMoreThanZero (value: number): void {
    if (value < 0) {
      throw new TransactionAmountZero('The transaction amount must be more than zero')
    }
  }
}
