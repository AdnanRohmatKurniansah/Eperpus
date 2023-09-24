import Joi from 'joi'
import type BookType from '../types/bookType'

export const validate = (payload: BookType) => {
  const schema = Joi.object({
    code: Joi.string().required().max(20),
    title: Joi.string().required().min(3).max(255),
    author: Joi.string().required().min(3).max(255),
    year: Joi.string().required()
  })

  return schema.validate(payload)
}
