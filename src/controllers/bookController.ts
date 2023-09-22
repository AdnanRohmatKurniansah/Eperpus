import { type Request, type Response, type NextFunction } from 'express'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    data: 'all book'
  })
}
