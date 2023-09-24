import { Router } from 'express'
import { destroy, getAll, show, store, update } from '../controllers/bookController'
import { verifyUser, checkOfficer } from '../middlewares/auth'

export const bookRouter: Router = Router()

bookRouter.get('/', verifyUser, getAll)
bookRouter.post('/create', verifyUser, checkOfficer, store)
bookRouter.get('/:id', verifyUser, show)
bookRouter.put('/:id/edit', verifyUser, checkOfficer, update)
bookRouter.delete('/:id', verifyUser, checkOfficer, destroy)
