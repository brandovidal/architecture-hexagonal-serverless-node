import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class TransactionUserCreated extends StringValueObject {
  constructor (value?: string) {
    super(value!)
  }
}
