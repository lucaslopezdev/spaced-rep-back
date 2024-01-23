import Router from 'express-promise-router';
import { AuthController } from '../controllers/auth.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { signupSchema, signinSchema } from '../schemas/auth.schema.js';
import { validateSchema } from '../middlewares/validate.middleware.js';

export const authRouter = Router()

authRouter.post('/signin', validateSchema(signinSchema), AuthController.signin)
authRouter.post('/signup', validateSchema(signupSchema), AuthController.singup)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/profile', isAuth, AuthController.profile)