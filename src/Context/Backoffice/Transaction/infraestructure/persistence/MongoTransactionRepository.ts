import { injectable } from 'inversify'

import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import { MongoRepository } from '../../../../Shared/infraestructure/persistence/mongo/MongoRepository'

import { AppContextEnum } from '../../../../../apps/AppContext'

import { type FindOptions } from 'mongodb'

interface TransactionDocument {
  _id: number
  id: string
  sellerDomain: string
  kind: string
  invoiceNumber: string
  amount: number
  total: number
  status: string
  userCreated: string
  userUpdated: string
  createdAt: Date
  updatedAt: Date
}

@injectable()
export class MongoTransactionRepository extends MongoRepository<Transaction, TransactionDocument> implements TransactionRepository {
  constructor () {
    super(AppContextEnum.BACKOFFICE_CONTEXT)
  }

  public save (transaction: Transaction): Promise<void> {
    return this.persist(transaction)
  }

  public async searchAll (): Promise<Transaction[]> {
    const query = {}
    const options: FindOptions = { sort: { created_at: -1 } }
    return await this.searchByFilters(query, options)
  }

  public async update (transaction: Transaction): Promise<void> {
    const repository = await this.collection()

    const transactionFormatted = transaction.toPrimitives()
    const transactionData = {
      invoice_number: transactionFormatted.invoice_number,
      amount: transactionFormatted.amount,
      status: transactionFormatted.status,
      user_updated: transactionFormatted.user_updated,
      updated_at: transactionFormatted.updated_at
    }

    const query = { id: transactionFormatted.id }

    await repository.findOneAndUpdate(query, { $set: transactionData })
  }

  public async delete (id: string): Promise<void> {
    const repository = await this.collection()

    await repository.deleteOne({ id })
  }

  protected collectionName () {
    return 'transactions'
  }
}
