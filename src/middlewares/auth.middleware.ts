import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types';

import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
config()

const confidentialPassword: string | undefined = process.env.MYPLAINTEXTPASSWORD

if (!confidentialPassword) {
  throw new Error('Confidential password not defined');
}

export const isAuth = (req: CustomRequest, res:Response, next: NextFunction): Response | void => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: 'No estas autorizado!' })
  }

  jwt.verify(token, confidentialPassword, (err, decoded): Response | void => {
    if (err || !decoded || typeof decoded !== 'object' || !('id' in decoded)) {
      console.log(err)
      return res.status(401).json({
        message: 'No estas autorizado'
      })
    }
    /* 
    decoded returns something like this 
    {
      id: '33019580-fad4-4a57-a2cf-d9c1400c80b5',
      iat: 1706041072,
      exp: 1706127472
    }
    */
    req.userId = decoded.id

    next()
    ;
  })
}
