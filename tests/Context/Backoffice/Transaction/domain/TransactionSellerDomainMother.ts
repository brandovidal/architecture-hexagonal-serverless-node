import { TransactionSellerDomain } from "src/Context/Backoffice/Transaction/domain/TransactionSellerDomain"
import { DomainMother } from "tests/Context/Shared/domain/DomainMother"

export class TransactionSellerDomainMother {
  static create (value: string): TransactionSellerDomain {
    return new TransactionSellerDomain(value)
  }
  static random (): TransactionSellerDomain {
    return this.create(DomainMother.random())
  }
}
