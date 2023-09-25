import Joi from 'joi'
import { type returnType, type borrowType } from '../types/actionType'

export const validateBorrow = (payload: borrowType) => {
  const schema = Joi.object({
    id_book: Joi.number().required()
  })

  return schema.validate(payload)
}

export const validateReturn = (payload: returnType) => {
  const schema = Joi.object({
    id_borrow: Joi.number().required()
  })

  return schema.validate(payload)
}
