import { serialize } from 'bson'
import fs from 'fs'
import path from 'path'

import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

export class FileTransactionRepository implements TransactionRepository {
  private readonly FILE_PATH = path.join(__dirname, '/transactions')

  async save (transaction: Transaction) {
    void fs.promises.writeFile(this.filePath(transaction.id.value), serialize(transaction))
  }

  private filePath (id: string) {
    return `${this.FILE_PATH}.${id}.repo`
  }

  async delete (id: string) {
    void fs.promises.unlink(this.filePath(id))
  }
}
