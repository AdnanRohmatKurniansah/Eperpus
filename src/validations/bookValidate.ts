import Joi from 'joi'

interface Book {
  title: string
  author: string
}

export const validateStore = (payload: Book) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(255),
    author: Joi.string().min(3).max(255)
  })

  return schema.validate(payload)
}
