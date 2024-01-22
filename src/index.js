import express, {json} from 'express'
import cors from 'cors';
import morgan from 'morgan'
import { config } from 'dotenv'
import { cardsRouter } from './routes/cards.js';
import { albumsRouter } from './routes/albums.js';

config()

const PORT = process.env.PORT ?? 3005;

const app = express()

app.use(json())
app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/api', albumsRouter)
app.use('/api', cardsRouter)


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