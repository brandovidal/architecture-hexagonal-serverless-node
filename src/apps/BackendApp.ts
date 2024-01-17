/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Server } from './server'

import { Config } from '../Context/Shared/infraestructure/config/secrets'

import type { App } from './App'
import { BackofficeApp } from './backoffice/BackofficeApp'

const config = new Config()

export class BackendApp {
  server!: Server
  static serviceApps: App[] = [new BackofficeApp()]

  async bootstrap () {
    this.server = new Server(config.port)
    await this.startAllDatabaseConnections()
  }

  async start () {
    await this.bootstrap()

    const server = this.server

    if (server === undefined) {
      throw new Error('Server not bootstrapped.')
    }

    await server.listen()
  }

  get httpServer () {
    return this.server?.getHTTPServer()
  }

  get serverApp () {
    return this.server?.expressApp()
  }

  async stop () {
    await this.server?.stop()
  }

  private async startAllDatabaseConnections () {
    await this.startDatabaseConnection(...BackendApp.serviceApps)
  }

  private async startDatabaseConnection (...serviceApps: App[]) {
    const uri = config.backofficeURI

    if (uri === undefined) {
      throw new Error('DB connection URI is missing.')
    }

    const startConnectionPromises = serviceApps.map(app => app.startDbClient(uri))
    await Promise.all(startConnectionPromises)
  }

  static async closeDatabaseConnections (...serviceApps: App[]) {
    const closeConnectionPromises = serviceApps.map(app => app.closeDbClient())
    await Promise.allSettled(closeConnectionPromises)
  }

  static async closeAllDatabaseConnections () {
    await BackendApp.closeDatabaseConnections(...BackendApp.serviceApps)
  }
}
