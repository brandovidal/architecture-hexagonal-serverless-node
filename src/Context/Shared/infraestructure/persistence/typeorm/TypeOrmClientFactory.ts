import { DataSource } from 'typeorm'
import type { TypeOrmConfig } from './TypeOrmConfig'

import { injectable } from 'inversify'

import type { Nullable } from '../../../../../Context/Shared/domain/Nullable'

import { TransactionEntity } from '../../../../../Context/Backoffice/Transaction/infraestructure/persistence/typeorm/TransactionEntity'

@injectable()
export class TypeOrmClientFactory {
  private static readonly clients: Record<string, DataSource> = {}

  async createClient (contextName: string, config: TypeOrmConfig) {
    let client = TypeOrmClientFactory.getClient(contextName)

    if (client !== undefined || client !== null) {
      client = await TypeOrmClientFactory.createAndConnectClient(contextName, config)
      TypeOrmClientFactory.registerClient(client, contextName)
    }
    console.log(`MongoDB client registered in context "${contextName}".`)

    return client
  }

  static async createAndConnectClient (contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    try {
      const connection = new DataSource({
        appname: contextName,
        type: 'mongodb',
        url: config.url,
        // entities: [__dirname + '/../../../../**/**/infraestructure/persistence/typeorm/*.{js,ts}'],
        entities: [TransactionEntity],
        synchronize: true,
        logging: true
      })

      await connection.initialize()

      console.log('MongoDB connected.')

      return connection
    } catch (err) {
      console.error('[Mongo DB connection]', err)
      throw new Error('MongoDB connection failed.')
    }
  }

  static getClient (contextName: string): Nullable<DataSource> {
    return TypeOrmClientFactory.clients[contextName]
  }

  static getClientOrFail (contextName: string): DataSource {
    const client = TypeOrmClientFactory.clients[contextName]
    if (client === undefined) {
      throw new Error(`BD client for context <${contextName}> was not registered.`)
    }

    return client
  }

  static registerClient (client: DataSource, contextName: string): void {
    TypeOrmClientFactory.clients[contextName] = client
  }
}
