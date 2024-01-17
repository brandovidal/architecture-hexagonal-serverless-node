/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { Filter, Collection, FindOptions, Document } from 'mongodb'
import { type AggregateRoot } from '../../../domain/AggregateRoot'

import { injectable, unmanaged } from 'inversify'

import { MongoClientFactory } from './MongoClientFactory'

@injectable()
export abstract class MongoRepository<T extends AggregateRoot, D extends Document> {
  context: string

  constructor (@unmanaged() readonly _context: string) {
    this.context = _context
  }
  protected abstract collectionName(): string

  protected get client () {
    return MongoClientFactory.getClientOrFail(this.context)
  }

  protected async collection (): Promise<Collection<D>> {
    const schema = this.collectionName()

    return this.client.db().collection(schema)
  }

  protected async persist (aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    const document = { ...aggregateRoot.toPrimitives() }

    // await collection.insertOne(document)
    await collection.updateOne({ id: document.id }, { $set: document }, { upsert: true })
  }

  protected async searchByFilters (filter: Filter<D> = {}, options?: FindOptions) {
    const collection = await this.collection()
    const documents = (await collection.find(filter, options).toArray()) as unknown as T[]
    return documents
  }
}
