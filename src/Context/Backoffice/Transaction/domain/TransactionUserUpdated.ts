import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class TransactionUserUpdated extends StringValueObject {
  constructor (value?: string) {
    super(value!)
  }
}
