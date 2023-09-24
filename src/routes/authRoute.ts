import { Router } from 'express'
import { login, register, refreshtoken } from '../controllers/authController'

export const authRouter: Router = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/refresh_token', refreshtoken)
