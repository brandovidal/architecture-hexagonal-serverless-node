import 'reflect-metadata'

import { TransactionRepositoryMock } from '../__mocks__/CourseRepositoryMock'
import TransactionCreator from 'src/Context/Backoffice/Transaction/application/TransactionCreator'

import { CreateTransactionRequestMother } from './CreateTransactionRequestMother'
import { TransactionMother } from '../domain/TransactionMother'

let repository: TransactionRepositoryMock
let creator: TransactionCreator

describe('TransactionCreator', () => {
  beforeAll(() => {
    repository = new TransactionRepositoryMock()
    creator = new TransactionCreator(repository)
  })

  it('should create a valid transaction', async () => {
    const request = CreateTransactionRequestMother.random()

    const transaction = TransactionMother.fromRequest(request)

    await creator.run(request)

    repository.assertSaveHasBeenCalledWith(transaction)
  })

  it('should throw an error when creating an invalid transaction', async () => {
    expect(() => {
      const request = CreateTransactionRequestMother.invalidRequest()

      const transaction = TransactionMother.fromRequest(request)

      creator.run(request)

      repository.assertSaveHasBeenCalledWith(transaction)
    }).toThrowError(/The transaction kind .+ is not valid/)
  })
})
