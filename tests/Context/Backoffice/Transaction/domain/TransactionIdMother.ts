import { TransactionId } from "src/Context/Backoffice/Transaction/domain/TransactionId"
import { UuidMother } from "tests/Context/Shared/domain/UuidMother"

export class TransactionIdMother {
  static create (value: string): TransactionId {
    return new TransactionId(value)
  }
  static random (): TransactionId {
    return this.create(UuidMother.random())
  }
}
