import Router from 'express-promise-router';
import { CardController } from '../controllers/cards.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { createCardSchema, updateCardSchema } from '../schemas/card.schema.js';
import { validateSchema } from '../middlewares/validate.middleware.js';

export const cardsRouter = Router()

// (para todas necesitamos isAuth y albumId)
cardsRouter.get('/:albumId', isAuth, CardController.getAll)
cardsRouter.get('/:albumId/:cardId', isAuth, CardController.getCardById) 
cardsRouter.post('/:albumId', isAuth, validateSchema(createCardSchema), CardController.createCard) 
cardsRouter.patch('/:albumId/:cardId', isAuth, validateSchema(updateCardSchema), CardController.updateCard) 
cardsRouter.delete('/:albumId/:cardId', isAuth, CardController.deleteCard)