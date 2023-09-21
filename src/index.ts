import express, { type Application, type Request, type Response, type NextFunction } from 'express'

const app: Application = express()
const port: number = 3000

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    data: 'oioioioi'
  })
})

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
