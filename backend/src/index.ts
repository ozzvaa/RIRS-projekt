import express, {type Request, type Response } from 'express'
import "dotenv/config";

const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.send('Backend deluje!')
})

app.listen(port, () => {
  console.log(`Strežnik posluša na http://localhost:${port}`)
})