import { Container } from 'inversify'

import HealthCheck from './HealthCheck'
import Transaction from './Transaction'

const container = Container.merge(HealthCheck, Transaction)

export default container
