import { type Response, type Request, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.token

  if (!token) {
    return res.status(403).json({
      message: 'Access denied, no token provided'
    })
  }

  const tokenSplit: string = token.split(' ')[1]

  try {
    const decoded: any = jwt.verify(tokenSplit, process.env.JWT_SECRET as string)
    const extendedReq = req as Request & {
      user?: any
    }
    extendedReq.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role
    }
    next()
  } catch (error) {
    res.clearCookie('token')
    return res.status(500).json({
      message: error
    })
  }
}

export const checkOfficer = (req: Request, res: Response, next: NextFunction) => {
  const extendedReq = req as Request & {
    user?: any
  }
  if (extendedReq.user && extendedReq.user.role === 'officer') {
    next()
  } else {
    return res.status(403).json({
      message: 'Unauthorized'
    })
  }
}
