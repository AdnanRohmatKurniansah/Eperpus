import { Router } from 'express'
import { borrow, returnBook, showBorrowedBook } from '../controllers/actionController'
import { verifyUser } from '../middlewares/auth'

export const actionRouter: Router = Router()

actionRouter.post('/borrow', verifyUser, borrow)
actionRouter.post('/return', verifyUser, returnBook)
actionRouter.get('/borrowedBook', verifyUser, showBorrowedBook)
