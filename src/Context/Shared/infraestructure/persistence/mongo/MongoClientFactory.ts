/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { MongoClient } from 'mongodb'
import type MongoConfig from './MongoConfig'

import { injectable } from 'inversify'

@injectable()
export class MongoClientFactory {
  private static readonly clients: Record<string, MongoClient> = {}

  static async createClient (contextName: string, config: MongoConfig): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName)

    if (client !== undefined || client !== null) {
      client = await MongoClientFactory.createAndConnectClient(contextName, config)
      MongoClientFactory.registerClient(client, contextName)
    }
    console.log(`MongoDB client registered in context "${contextName}".`)

    return client
  }

  static async closeClientConnection (contextName: string): Promise<void> {
    const client = MongoClientFactory.clients[contextName]
    if (client !== undefined || client !== null) {
      await client.close()
      delete MongoClientFactory.clients[contextName]
      console.log(`MongoDB client disconnected and removed from "${contextName}" context.`)
    }
  }

  private static async createAndConnectClient (contextName: string, config: MongoConfig): Promise<MongoClient> {
    try {
      const client = new MongoClient(config.url, { appName: contextName })

      await client.connect()
      console.log('[Mongo DB connected]')

      return client
    } catch (err) {
      console.error('[Mongo DB connection]', err)
      throw new Error('MongoDB connection failed.')
    }
  }

  private static getClient (contextName: string): MongoClient | null {
    return MongoClientFactory.clients[contextName]
  }

  static getClientOrFail (contextName: string): MongoClient {
    const client = MongoClientFactory.clients[contextName]
    if (client === undefined) {
      throw new Error(`BD client for context <${contextName}> was not registered.`)
    }

    return client
  }

  private static registerClient (client: MongoClient, contextName: string): void {
    MongoClientFactory.clients[contextName] = client
  }
}
