/* eslint-disable @typescript-eslint/space-before-function-paren */
import { MongoClientFactory } from '../Context/Shared/infraestructure/persistence/mongo/MongoClientFactory'

export abstract class App {
  abstract context(): string

  async startDbClient (connectionUri: string): Promise<void> {
    await MongoClientFactory.createClient(this.context(), { url: connectionUri })
  }

  async closeDbClient (): Promise<void> {
    await MongoClientFactory.closeClientConnection(this.context())
  }
}
