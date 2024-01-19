import Router from 'express-promise-router';
import { CardController } from '../controllers/cards.js';

export const cardsRouter = Router()

cardsRouter.get('/', CardController.getAll)