import express, {type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import authorRouter from './routes/author'
import editorRouter from './routes/editor'
import projectRouter from './routes/project'

const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/avtorji', authorRouter)
app.use('/api/uredniki', editorRouter)
app.use('/api/projekti', projectRouter)

app.get('/', (_req: Request, res: Response) => {
  res.send('Backend deluje!')
})

app.listen(port, () => {
  console.log(`Strežnik posluša na http://localhost:${port}`)
})
