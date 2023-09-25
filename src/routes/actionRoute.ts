import { Router } from 'express'
import { borrow } from '../controllers/actionController'
import { verifyUser } from '../middlewares/auth'

export const actionRouter: Router = Router()

actionRouter.post('/borrow', verifyUser, borrow)
