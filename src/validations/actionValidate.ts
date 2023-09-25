import Joi from 'joi'
import type BorrowType from '../types/actionType'

export const validateBorrow = (payload: BorrowType) => {
  const schema = Joi.object({
    id_book: Joi.number().required()
  })

  return schema.validate(payload)
}
