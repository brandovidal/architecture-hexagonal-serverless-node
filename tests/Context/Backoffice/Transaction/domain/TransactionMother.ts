import { Transaction, TransactionPrimitives } from 'src/Context/Backoffice/Transaction/domain/Transaction'
import { Maybe } from 'src/Context/Shared/domain/Maybe'

import { TransactionCreatorRequest } from 'src/Context/Backoffice/Transaction/application/TransactionCreatorRequest'

import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'
import { TransactionAmount } from 'src/Context/Backoffice/Transaction/domain/TransactionAmount'
import { TransactionCreatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionCreatedAt'
import { TransactionInvoiceNumber } from 'src/Context/Backoffice/Transaction/domain/TransactionInvoiceNumber'
import { TransactionKind } from 'src/Context/Backoffice/Transaction/domain/TransactionKind'
import { TransactionSellerDomain } from 'src/Context/Backoffice/Transaction/domain/TransactionSellerDomain'
import { TransactionStatus } from 'src/Context/Backoffice/Transaction/domain/TransactionStatus'
import { TransactionTotal } from 'src/Context/Backoffice/Transaction/domain/TransactionTotal'
import { TransactionUpdatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionUpdatedAt'
import { TransactionUserCreated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserCreated'
import { TransactionUserUpdated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserUpdated'

import { TransactionIdMother } from './TransactionIdMother'
import { TransactionSellerDomainMother } from './TransactionSellerDomainMother'
import { TransactionKindMother } from './TransactionKindMother'
import { TransactionInvoiceNumberMother } from './TransactionInvoiceNumberMother'
import { TransactionAmountMother } from './TransactionAmountMother'
import { TransactionTotalMother } from './TransactionTotalMother'
import { TransactionStatusMother } from './TransactionStatusMother'
import { TransactionUserCreatedMother } from './TransactionUserCreatedMother'
import { TransactionUserUpdatedMother } from './TransactionUserUpdatedMother'
import { TransactionCreatedAtMother } from './TransactionCreatedAtMother'
import { TransactionUpdatedAtMother } from './TransactionUpdatedAtMother'

export class TransactionMother {
  static create (
    id: TransactionId,
    sellerDomain: TransactionSellerDomain,
    kind: TransactionKind,
    invoiceNumber: TransactionInvoiceNumber,
    amount: TransactionAmount,
    total: TransactionTotal,
    status: Maybe<TransactionStatus>,
    userCreated: TransactionUserCreated,
    userUpdated: TransactionUserUpdated,
    createdAt?: TransactionCreatedAt,
    updatedAt?: TransactionUpdatedAt
  ) {
    const primitives: TransactionPrimitives = {
      id: id.value,
      seller_domain: sellerDomain.value,
      kind: kind.value,
      invoice_number: invoiceNumber.value,
      amount: amount.value,
      total: total.value,
      status: status.map(status => status.value),
      user_created: userCreated.value,
      user_updated: userUpdated.value,
      created_at: createdAt?.value,
      updated_at: updatedAt?.value
    }
    return Transaction.fromPrimitives(primitives)
  }

  static fromRequest (request: TransactionCreatorRequest): Transaction {
    return this.create(
      new TransactionId(request.id),
      new TransactionSellerDomain(request.seller_domain),
      new TransactionKind(request.kind),
      new TransactionInvoiceNumber(request.invoice_number),
      new TransactionAmount(request.amount),
      new TransactionTotal(request.total),
      request.status.map(status => new TransactionStatus(status)),
      new TransactionUserCreated(request.user_created),
      new TransactionUserUpdated(request.user_updated),
      new TransactionCreatedAt(request.created_at),
      new TransactionUpdatedAt(request.updated_at)
    )
  }

  static random (): Transaction {
    return this.create(
      TransactionIdMother.random(),
      TransactionSellerDomainMother.random(),
      TransactionKindMother.random(),
      TransactionInvoiceNumberMother.random(),
      TransactionAmountMother.random(),
      TransactionTotalMother.random(),
      Maybe.some(TransactionStatusMother.random()),
      TransactionUserCreatedMother.random(),
      TransactionUserUpdatedMother.random(),
      TransactionCreatedAtMother.random(),
      TransactionUpdatedAtMother.random()
    )
  }
}
