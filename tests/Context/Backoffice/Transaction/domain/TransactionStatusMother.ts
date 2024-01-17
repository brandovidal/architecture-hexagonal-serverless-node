import { TransactionStatus, TransactionStatusType } from "src/Context/Backoffice/Transaction/domain/TransactionStatus";

export class TransactionStatusMother {
  static create (value: string): TransactionStatus {
    return new TransactionStatus(value)
  }

  static random (): TransactionStatus {
    return this.create(Object.keys(TransactionStatusType)[Math.floor(Math.random() * Object.keys(TransactionStatusType).length)])
  }
}
