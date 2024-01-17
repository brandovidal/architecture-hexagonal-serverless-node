import { TransactionId } from './TransactionId'
import { TransactionInvoiceNumber } from './TransactionInvoiceNumber'
import { TransactionKind } from './TransactionKind'
import { TransactionSellerDomain } from './TransactionSellerDomain'
import { TransactionStatus } from './TransactionStatus'
import { TransactionAmount } from './TransactionAmount'
import { TransactionTotal } from './TransactionTotal'
import { TransactionUserCreated } from './TransactionUserCreated'
import { TransactionUserUpdated } from './TransactionUserUpdated'
import { TransactionCreatedAt } from './TransactionCreatedAt'
import { TransactionUpdatedAt } from './TransactionUpdatedAt'

import { type ObjectId } from '../../../Shared/domain/value-object/ObjectId'
import type { Maybe } from '../../../Shared/domain/Maybe'

export interface TransactionPrimitives {
  id: string
  seller_domain: string
  kind: string
  invoice_number: number
  amount: number
  total: number
  status: Maybe<string>
  user_created?: string
  user_updated?: string
  created_at?: Date
  updated_at?: Date
}

export class Transaction {
  readonly _id!: ObjectId
  readonly id!: TransactionId

  readonly sellerDomain!: TransactionSellerDomain
  readonly kind!: TransactionKind

  readonly invoiceNumber: TransactionInvoiceNumber

  readonly amount!: TransactionAmount
  readonly total: TransactionTotal

  readonly status: Maybe<TransactionStatus>

  readonly userCreated?: TransactionUserCreated
  readonly userUpdated?: TransactionUserUpdated

  readonly createdAt?: TransactionCreatedAt
  readonly updatedAt?: TransactionUpdatedAt

  // TODO: implement Maybe Pattern
  constructor (
    id: TransactionId,
    sellerDomain: TransactionSellerDomain,
    kind: TransactionKind,
    invoiceNumber: TransactionInvoiceNumber,
    amount: TransactionAmount,
    total: TransactionTotal,
    status: Maybe<TransactionStatus>,
    userCreated?: TransactionUserCreated,
    userUpdated?: TransactionUserUpdated,
    createdAt?: TransactionCreatedAt,
    updatedAt?: TransactionUpdatedAt
  ) {
    this.id = id
    this.sellerDomain = sellerDomain
    this.kind = kind
    this.invoiceNumber = invoiceNumber
    this.amount = amount
    this.total = total
    this.status = status
    this.userCreated = userCreated
    this.userUpdated = userUpdated
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static create (
    id: string,
    sellerDomain: string,
    kind: string,
    invoiceNumber: number,
    amount: number,
    total: number,
    status: Maybe<string>,
    userCreated?: string,
    userUpdated?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): Transaction {
    return new Transaction(
      id === undefined ? TransactionId.random() : new TransactionId(id),
      new TransactionSellerDomain(sellerDomain),
      new TransactionKind(kind),
      new TransactionInvoiceNumber(invoiceNumber),
      new TransactionAmount(amount),
      new TransactionTotal(total),
      status.map(status => new TransactionStatus(status)),
      userCreated != null ? new TransactionUserCreated(userCreated) : undefined,
      userUpdated != null ? new TransactionUserUpdated(userUpdated) : undefined,
      new TransactionCreatedAt(createdAt),
      new TransactionUpdatedAt(updatedAt)
    )
  }

  static fromPrimitives (primitives: TransactionPrimitives): Transaction {
    return new Transaction(
      primitives.id === undefined ? TransactionId.random() : new TransactionId(primitives.id),
      new TransactionSellerDomain(primitives.seller_domain),
      new TransactionKind(primitives.kind),
      new TransactionInvoiceNumber(primitives.invoice_number),
      new TransactionAmount(primitives.amount),
      new TransactionTotal(primitives.total),
      primitives.status.map(status => new TransactionStatus(status)),
      primitives.user_created != null ? new TransactionUserCreated(primitives.user_created) : undefined,
      primitives.user_updated != null ? new TransactionUserUpdated(primitives.user_updated) : undefined,
      primitives.created_at != null ? new TransactionCreatedAt(primitives.created_at) : undefined,
      primitives.updated_at != null ? new TransactionUpdatedAt(primitives.updated_at) : undefined
    )
  }

  toPrimitives () {
    return {
      id: this.id.value,
      seller_domain: this.sellerDomain.value,
      kind: this.kind.value,
      invoice_number: this.invoiceNumber.value,
      amount: this.amount.value,
      total: this.total.value,
      status: this.status.toPrimitive()?.value,
      user_created: this.userCreated?.value,
      user_updated: this.userUpdated?.value,
      created_at: this.createdAt?.value,
      updated_at: this.updatedAt?.value
    }
  }
}
