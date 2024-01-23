import express, {json} from 'express'
import cors from 'cors';
import morgan from 'morgan'
import { config } from 'dotenv'

// Import Routes
import { cardsRouter } from './routes/cards.js';
import { albumsRouter } from './routes/albums.js';
import { authRouter } from './routes/auth.js';
import cookieParser from 'cookie-parser';

config()

const PORT = process.env.PORT ?? 3005;

const app = express()

app.use(json())
app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Routes
app.use('/api', albumsRouter)
app.use('/api', cardsRouter)
app.use('/api', authRouter)


// Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({status: 'error', messsage: err.message})
})

// Error not found
app.use((_req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
})