import express, { type Application } from 'express'
import { bookRouter } from './routes/bookRoute'
import cors from 'cors'
import { authRouter } from './routes/authRoute'
import cookieParser from 'cookie-parser'
import { actionRouter } from './routes/actionRoute'

const app: Application = express()
const port: number = 3000

app.use(express.json())
app.use(cors())

app.use(cookieParser())

app.use('/books', bookRouter)
app.use('/auth', authRouter)
app.use('/action', actionRouter)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
