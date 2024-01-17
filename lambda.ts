import serverless from 'serverless-http'
import type ServerlessHttp from 'serverless-http'

import { BackendApp } from './src/apps/BackendApp'

export const handler = async (event?: ServerlessHttp.Application, context?: ServerlessHttp.Options) => {
  const app = new BackendApp()
  await app.bootstrap()
  const expressApp = app.serverApp

  if (expressApp === undefined) {
    throw new Error('Server not bootstrapped.')
  }

  const promiseHandler = serverless(expressApp)
  return await promiseHandler(event!, context!)
}

void handler()
