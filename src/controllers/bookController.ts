import { type Request, type Response, type NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { validate } from '../validations/bookValidate'

const prisma = new PrismaClient()

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: any = await prisma.book.findMany()
    res.status(200).json({
      message: 'Success',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: any = await prisma.book.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.status(200).json({
      message: 'Book detail',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = validate(req.body)
    if (error) {
      return res.status(422).json({
        message: error.details[0].message
      })
    }
    const response: any = await prisma.book.create({
      data: value
    })
    res.status(200).json({
      message: 'Successfully added new book',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = validate(req.body)
    if (error) {
      return res.status(422).json({
        message: error.details[0].message
      })
    }
    const response: any = await prisma.book.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: value
    })
    res.status(200).json({
      message: 'Book has been updated',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: any = await prisma.book.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.status(200).json({
      message: 'Book has been deleted',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
