import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'
import { validateLogin, validateRegister } from '../validations/authValidate'
import bcrypt from 'bcrypt'
import { secretToken, refreshToken } from '../utils/jwtToken'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = validateRegister(req.body)
  if (error) {
    return res.status(422).json({
      message: error.details[0].message
    })
  }
  try {
    const existUser: any = await prisma.user.findUnique({
      where: {
        username: value.username
      }
    })
    if (existUser) {
      return res.status(409).json({
        message: 'Username already used'
      })
    }
    const hashedPassword: string = await bcrypt.hash(value.password, 12)

    value.password = hashedPassword

    const response: any = await prisma.user.create({
      data: value
    })
    res.status(200).json({
      message: 'Register successfully',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = validateLogin(req.body)
  if (error) {
    return res.status(422).json({
      message: error.details[0].message
    })
  }
  try {
    const user: any = await prisma.user.findUnique({
      where: {
        username: value.username
      }
    })
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    const auth = await bcrypt.compare(value.password, user.password)
    if (auth) {
      const token: string = secretToken(user.id, user.username, user.role)
      const refreshtoken: string = refreshToken(user.id, user.username, user.role)

      res.cookie('token', `Bearer ${token}`, {
        httpOnly: true
      })

      res.cookie('refreshToken', `Bearer ${refreshtoken}`, {
        httpOnly: true
      })

      return res.status(200).json({
        message: 'Login successfully',
        token: `Bearer ${token}`,
        refreshToken: `Bearer ${refreshtoken}`
      })
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const refreshtoken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken: string = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(403).json({
      message: 'Access denied, no token provided'
    })
  }

  const refreshTokenSplit: string = refreshToken.split(' ')[1]

  try {
    const decoded: any = jwt.verify(refreshTokenSplit, process.env.JWT_SECRET as string)

    const user: any = await prisma.user.findUnique({
      where: {
        username: decoded.username
      }
    })
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    const token: string = secretToken(user.id, user.username, user.role)

    res.cookie('token', `Bearer ${token}`, {
      httpOnly: true
    })
    res.status(200).json({
      message: 'Refresh token successfully',
      token: `Bearer ${token}`
    })
  } catch (error) {
    res.clearCookie('refreshToken')
    res.status(500).json({
      message: error
    })
  }
}
