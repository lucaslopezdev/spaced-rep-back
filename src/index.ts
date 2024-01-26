import express, { ErrorRequestHandler, json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cron from 'node-cron'
import { config } from 'dotenv'
config()

// Import Types
import { ErrorHandlerMiddleware } from './types.ts';

// Import Routes
import { cardsRouter } from './routes/cards.js'
import { albumsRouter } from './routes/albums.js'
import { authRouter } from './routes/auth.js'
import cookieParser from 'cookie-parser'
import { decrementNextReviewCard } from './services/systemOfFrecuency.js'

const PORT = process.env.PORT ?? 3005

const app = express()

app.use(json())
app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Cron to update the next_review_interval of cards every day
cron.schedule('0 0 * * *', () => {
  decrementNextReviewCard()
  console.log('Se ejecuto el cron');
})

// Routes
app.use('/api', authRouter)
app.use('/api', albumsRouter)
app.use('/api/album', cardsRouter)

// Error Handler
const errorHandler: ErrorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({ status: 'error', messsage: err.message })
}
app.use(errorHandler as ErrorRequestHandler)

// Error not found
app.use((_req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
