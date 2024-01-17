import { object, string } from 'zod'

const deleteTransactionSchema = object({
  params: object({
    id: string({ required_error: 'id is required', invalid_type_error: 'id must be a string' }).uuid('id must be a valid UUID')
  })
})

export default deleteTransactionSchema
