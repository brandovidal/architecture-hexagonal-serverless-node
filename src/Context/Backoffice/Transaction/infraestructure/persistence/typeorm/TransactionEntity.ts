import { EntitySchema } from 'typeorm'

import { ValueObjectTransformer } from '../../../../../Shared/infraestructure/persistence/typeorm/ValueObjectTransformer'

import { Transaction } from '../../../domain/Transaction'
import { TransactionId } from '../../../domain/TransactionId'
import { TransactionSellerDomain } from '../../../domain/TransactionSellerDomain'
import { TransactionKind } from '../../../domain/TransactionKind'
import { TransactionInvoiceNumber } from '../../../domain/TransactionInvoiceNumber'
import { TransactionAmount } from '../../../domain/TransactionAmount'
import { TransactionTotal } from '../../../domain/TransactionTotal'
import { TransactionStatus } from '../../../domain/TransactionStatus'
import { TransactionUserCreated } from '../../../domain/TransactionUserCreated'
import { TransactionUserUpdated } from '../../../domain/TransactionUserUpdated'
import { TransactionCreatedAt } from '../../../domain/TransactionCreatedAt'
import { TransactionUpdatedAt } from '../../../domain/TransactionUpdatedAt'

export const TransactionEntity = new EntitySchema<Transaction>({
  name: 'Transaction',
  tableName: 'transactions',
  target: Transaction,
  columns: {
    _id: {
      type: String,
      objectId: true,
      generated: true
    },
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(TransactionId)
    },
    sellerDomain: {
      name: 'seller_domain',
      type: String,
      transformer: ValueObjectTransformer(TransactionSellerDomain)
    },
    kind: {
      type: String,
      nullable: false,
      transformer: ValueObjectTransformer(TransactionKind)
    },
    invoiceNumber: {
      name: 'invoice_number',
      type: Number,
      nullable: true,
      transformer: ValueObjectTransformer(TransactionInvoiceNumber)
    },
    amount: {
      type: Number,
      transformer: ValueObjectTransformer(TransactionAmount)
    },
    total: {
      type: Number,
      nullable: true,
      transformer: ValueObjectTransformer(TransactionTotal)
    },
    status: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(TransactionStatus)
    },
    userCreated: {
      name: 'user_created',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(TransactionUserCreated)
    },
    userUpdated: {
      name: 'user_updated',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(TransactionUserUpdated)
    },
    createdAt: {
      name: 'created_at',
      type: Date,
      nullable: true,
      transformer: ValueObjectTransformer(TransactionCreatedAt),
      default: () => new Date()
    },
    updatedAt: {
      name: 'updated_at',
      type: Date,
      nullable: true,
      transformer: ValueObjectTransformer(TransactionUpdatedAt)
    }
  },
  indices: []
})
