import Joi from 'joi'
import type AuthType from '../types/authType'

export const validateRegister = (payload: AuthType) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(255),
    name: Joi.string().required().min(3).max(255),
    role: Joi.string(),
    password: Joi.string().min(5)
  })

  return schema.validate(payload)
}

export const validateLogin = (payload: AuthType) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(255),
    password: Joi.string().min(5)
  })

  return schema.validate(payload)
}
