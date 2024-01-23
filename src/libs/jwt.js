import jwt from 'jsonwebtoken'

const MYPLAINTEXTPASSWORD = process.env.MYPLAINTEXTPASSWORD

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      MYPLAINTEXTPASSWORD,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if(err) reject(err)
        resolve(token)
      }
    )
  })
}