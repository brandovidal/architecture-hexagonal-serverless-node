import 'reflect-metadata'

import request from 'supertest'

import { BackendApp } from 'src/apps/BackendApp'

// import { startServer } from './server'

let application: BackendApp

describe.skip('Check the status api', () => {
  it.skip('I send a GET request to /v1/status, it should return 200', async () => {
    const response = await request(application.httpServer).get('/v1/status')

    expect(response.statusCode).toEqual(200)
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
  })
})

// beforeAll(async () => {
//   application = await startServer()
// })

// afterAll(async () => {
//   await application.stop()
// })
