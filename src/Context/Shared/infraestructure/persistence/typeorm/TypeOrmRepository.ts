/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { EntitySchema, MongoRepository } from 'typeorm'
import { type MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions'
import { injectable, unmanaged } from 'inversify'

import type { AggregateRoot } from '../../../domain/AggregateRoot'
import { TypeOrmClientFactory } from './TypeOrmClientFactory'

@injectable()
export abstract class TypeOrmRepository<T extends AggregateRoot> {
  context: string

  constructor (@unmanaged() readonly _context: string) {
    this.context = _context
  }

  protected abstract entitySchema(): EntitySchema<T>

  protected get client () {
    return TypeOrmClientFactory.getClientOrFail(this.context)
  }

  protected async repository (): Promise<MongoRepository<T>> {
    const schema = this.entitySchema()
    return this.client.getMongoRepository(schema)
  }

  protected async persist (aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    const document = aggregateRoot.toPrimitives()

    await repository.save(document)
  }

  protected async searchByFilters (options: MongoFindManyOptions): Promise<T[]> {
    const repository = await this.repository()
    const documents = await repository.find(options)
    return documents
  }
}
