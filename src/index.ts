import express, { type Application } from 'express'
import { bookRouter } from './routes/bookRoute'
import cors from 'cors'

const app: Application = express()
const port: number = 3000

app.use(express.json())
app.use(cors())

app.use('/books', bookRouter)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
