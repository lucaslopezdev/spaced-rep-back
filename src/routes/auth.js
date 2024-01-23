import Router from 'express-promise-router';
import { AuthController } from '../controllers/auth.js';
import { isAuth } from '../middlewares/auth.middleware.js';

export const authRouter = Router()

authRouter.post('/signin', AuthController.signin)
authRouter.post('/signup', AuthController.singup)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/profile', isAuth, AuthController.profile)