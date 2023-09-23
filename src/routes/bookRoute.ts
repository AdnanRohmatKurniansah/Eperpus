import { Router } from 'express'
import { destroy, getAll, show, store, update } from '../controllers/bookController'

export const bookRouter: Router = Router()

bookRouter.get('/', getAll)
bookRouter.post('/create', store)
bookRouter.get('/:id', show)
bookRouter.put('/:id/edit', update)
bookRouter.delete('/:id', destroy)
