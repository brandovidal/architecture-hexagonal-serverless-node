import 'reflect-metadata'

import { BackendApp } from 'src/apps/BackendApp'

let application: BackendApp

export async function startServer () {
  application = new BackendApp()

  if (!application.httpServer) {
    console.log('Application not started')
    await application.start()
  }

  return application
}

// beforeAll(async () => {
//   await startServer()
// })

// afterAll(async () => {
//   await application.stop()
// })
