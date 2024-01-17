import 'reflect-metadata'

import request from 'supertest'

import { BackendApp } from 'src/apps/BackendApp'

let application: BackendApp

beforeAll(async () => {
  application = new BackendApp()
  await application.start()
})

afterAll(async () => {
  await application.stop()
})

describe('Check the transaction api', () => {
  it('I send a GET request to /v1/transaction, it should return 200', async () => {
    const response = await request(application.httpServer).get('/v1/transaction')

    expect(response.statusCode).toEqual(200)
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.body.success).toEqual(true)
  })

  it('I send a POST request to /v1/transaction, it should return 201', async () => {
    const response = await request(application.httpServer).post('/v1/transaction').send({
      seller_domain: 'test.com',
      kind: 'WALLET',
      invoice_number: 8,
      amount: 10,
      status: 'PENDING',
      user_created: 'test',
      user_updated: 'test'
    })

    expect(response.statusCode).toEqual(201)
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.body.success).toEqual(true)
  })

  it('I send a DELETE request to /v1/transaction, it should return 200', async () => {
    const response = await request(application.httpServer).get('/v1/transaction')

    const transactions = response.body.data

    expect(response.statusCode).toEqual(200)
    expect(transactions.length).toBeGreaterThan(0)

    const transactionId = transactions[0].id
    console.log('🚀 ~ it ~ transactionId:', transactionId)

    await request(application.httpServer).delete(`/v1/transaction/${transactionId}`).send({
      id: transactionId
    })
  })
})
