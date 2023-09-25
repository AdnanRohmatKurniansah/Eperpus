import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'
import { validateBorrow } from '../validations/actionValidate'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

export const borrow = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = validateBorrow(req.body)
  if (error) {
    return res.status(422).json({
      message: error.details[0].message
    })
  }

  try {
    const token: string = req.cookies.token

    const tokenSplit: string = token.split(' ')[1]
    const decoded: any = jwt.verify(tokenSplit, process.env.JWT_SECRET as string)

    const userId: number = decoded.id
    const user: any = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    const fill: any = {
      id_book: value.id_book,
      id_user: user.id
    }

    const response: any = await prisma.borrow.create({
      data: fill
    })

    res.status(200).json({
      message: 'Successfully borrowing book',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
