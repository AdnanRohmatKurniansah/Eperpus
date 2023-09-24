import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

export const secretToken = (id: number, username: string, role: string): string => {
  return jwt.sign({ id, username, role }, process.env.JWT_SECRET as string, {
    expiresIn: '1d'
  })
}

export const refreshToken = (id: number, username: string, role: string): string => {
  return jwt.sign({ id, username, role }, process.env.JWT_SECRET as string, {
    expiresIn: '1y'
  })
}
