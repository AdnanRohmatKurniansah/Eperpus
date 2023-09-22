import { Router } from 'express'
import { getAll } from '../controllers/bookController'

export const bookRouter: Router = Router()

bookRouter.get('/', getAll)
