import { Container } from 'inversify'

import TransactionReader from '../../../Context/Backoffice/Transaction/application/TransactionReader'
import TransactionCreator from '../../../Context/Backoffice/Transaction/application/TransactionCreator'
import TransactionUpdator from '../../../Context/Backoffice/Transaction/application/TransactionUpdator'
import TransactionDeletor from '../../../Context/Backoffice/Transaction/application/TransactionDeletor'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionPostController from '../controllers/TransactionPostController'
import TransactionPutController from '../controllers/TransactionPutController'
import TransactionDeleteController from '../controllers/TransactionDeleteController'

import { MongoClientFactory } from '../../../Context/Shared/infraestructure/persistence/mongo/MongoClientFactory'
import { MongoTransactionRepository } from '../../../Context/Backoffice/Transaction/infraestructure/persistence/MongoTransactionRepository'

const container = new Container()

container.bind(MongoClientFactory).toSelf()
container.bind('Backoffice.Transaction.domain.TransactionRepository').to(MongoTransactionRepository)

container.bind('Backoffice.Transaction.application.TransactionReader').to(TransactionReader)
container.bind(TransactionsGetController).toSelf()

container.bind('Backoffice.Transaction.application.TransactionCreator').to(TransactionCreator)
container.bind(TransactionPostController).toSelf()

container.bind('Backoffice.Transaction.application.TransactionUpdator').to(TransactionUpdator)
container.bind(TransactionPutController).toSelf()

container.bind('Backoffice.Transaction.application.TransactionDeletor').to(TransactionDeletor)
container.bind(TransactionDeleteController).toSelf()

export default container
