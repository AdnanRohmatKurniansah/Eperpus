import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'
import { validateBorrow, validateReturn } from '../validations/actionValidate'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

export const showBorrowedBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const extendedReq = req as Request & {
      user?: any
    }
    const user: any = await prisma.user.findUnique({
      where: {
        id: extendedReq.user.id
      }
    })

    const response: any = await prisma.borrow.findMany({
      where: {
        id_user: user.id,
        returned: false
      }
    })
    if (response.length < 1) {
      return res.status(404).json({
        message: 'You havent borrowed any books'
      })
    }
    res.status(200).json({
      message: 'Show borrowed book',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const borrow = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = validateBorrow(req.body)
  if (error) {
    return res.status(422).json({
      message: error.details[0].message
    })
  }

  try {
    const extendedReq = req as Request & {
      user?: any
    }
    const user: any = await prisma.user.findUnique({
      where: {
        id: extendedReq.user.id
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

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = validateReturn(req.body)
  if (error) {
    return res.status(422).json({
      message: error.details[0].message
    })
  }
  try {
    const borrow: any = await prisma.borrow.findUnique({
      where: {
        id: value.id_borrow
      }
    })
    if (!borrow) {
      return res.status(404).json({
        message: 'No Borrowing'
      })
    }

    const returned: any = await prisma.return.create({
      data: {
        id_borrow: borrow.id
      }
    })

    await prisma.borrow.update({
      where: {
        id: borrow.id
      },
      data: {
        returned: true
      }
    })

    if (borrow.return_date <= returned.return_date) {
      const response: any = await prisma.return.update({
        where: {
          id: returned.id
        },
        data: {
          forfeit: 50000
        }
      })
      return res.status(200).json({
        message: 'Book has been returned, you get a forfeit',
        data: response
      })
    } else {
      return res.status(200).json({
        message: 'Book has been returned',
        data: returned
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
