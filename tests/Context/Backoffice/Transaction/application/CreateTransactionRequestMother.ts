import { TransactionCreatorRequest } from 'src/Context/Backoffice/Transaction/application/TransactionCreatorRequest'

import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'
import { TransactionSellerDomain } from 'src/Context/Backoffice/Transaction/domain/TransactionSellerDomain'
import { TransactionKind } from 'src/Context/Backoffice/Transaction/domain/TransactionKind'
import { TransactionInvoiceNumber } from 'src/Context/Backoffice/Transaction/domain/TransactionInvoiceNumber'
import { TransactionAmount } from 'src/Context/Backoffice/Transaction/domain/TransactionAmount'
import { TransactionTotal } from 'src/Context/Backoffice/Transaction/domain/TransactionTotal'
import { TransactionStatus } from 'src/Context/Backoffice/Transaction/domain/TransactionStatus'
import { TransactionUserCreated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserCreated'
import { TransactionUserUpdated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserUpdated'
import { TransactionCreatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionCreatedAt'
import { TransactionUpdatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionUpdatedAt'

import { TransactionIdMother } from '../domain/TransactionIdMother'
import { TransactionSellerDomainMother } from '../domain/TransactionSellerDomainMother'
import { TransactionKindMother } from '../domain/TransactionKindMother'
import { TransactionInvoiceNumberMother } from '../domain/TransactionInvoiceNumberMother'
import { TransactionAmountMother } from '../domain/TransactionAmountMother'
import { TransactionTotalMother } from '../domain/TransactionTotalMother'
import { TransactionStatusMother } from '../domain/TransactionStatusMother'
import { TransactionUserCreatedMother } from '../domain/TransactionUserCreatedMother'
import { TransactionUserUpdatedMother } from '../domain/TransactionUserUpdatedMother'
import { TransactionCreatedAtMother } from '../domain/TransactionCreatedAtMother'
import { TransactionUpdatedAtMother } from '../domain/TransactionUpdatedAtMother'
import { Maybe } from 'src/Context/Shared/domain/Maybe'

export class CreateTransactionRequestMother {
  static create (
    id: TransactionId,
    sellerDomain: TransactionSellerDomain,
    kind: TransactionKind,
    invoiceNumber: TransactionInvoiceNumber,
    amount: TransactionAmount,
    total: TransactionTotal,
    status: TransactionStatus,
    userCreated: TransactionUserCreated,
    userUpdated: TransactionUserUpdated,
    createdAt?: TransactionCreatedAt,
    updatedAt?: TransactionUpdatedAt
  ): TransactionCreatorRequest {
    return {
      id: id.value,
      seller_domain: sellerDomain.value,
      kind: kind.value,
      invoice_number: invoiceNumber.value,
      amount: amount.value,
      total: total.value,
      status: Maybe.some(status.value),
      user_created: userCreated.value,
      user_updated: userUpdated.value,
      created_at: createdAt?.value,
      updated_at: updatedAt?.value
    }
  }

  static random (): TransactionCreatorRequest {
    return this.create(
      TransactionIdMother.random(),
      TransactionSellerDomainMother.random(),
      TransactionKindMother.random(),
      TransactionInvoiceNumberMother.random(),
      TransactionAmountMother.random(),
      TransactionTotalMother.random(),
      TransactionStatusMother.random(),
      TransactionUserCreatedMother.random(),
      TransactionUserUpdatedMother.random(),
      TransactionCreatedAtMother.random(),
      TransactionUpdatedAtMother.random()
    )
  }

  static invalidRequest (): TransactionCreatorRequest {
    return {
      id: TransactionIdMother.random().value,
      seller_domain: TransactionSellerDomainMother.random().value,
      kind: TransactionKindMother.invalidKind(),
      invoice_number: TransactionInvoiceNumberMother.random().value,
      amount: TransactionAmountMother.random().value,
      total: TransactionTotalMother.random().value,
      status: Maybe.some(TransactionStatusMother.random().value),
      user_created: TransactionUserCreatedMother.random().value,
      user_updated: TransactionUserUpdatedMother.random().value,
      created_at: TransactionCreatedAtMother.random().value,
      updated_at: TransactionUpdatedAtMother.random().value
    }
  }
}
