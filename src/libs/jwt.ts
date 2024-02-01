import jwt from 'jsonwebtoken'
import { Payload } from '../types'

const confidentialPassword: string | undefined = process.env.MYPLAINTEXTPASSWORD

if (!confidentialPassword) {
  throw new Error('Confidential password not defined');
}

export const createAccessToken = (payload: Payload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      confidentialPassword,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token as string)
      }
    )
  })
}
