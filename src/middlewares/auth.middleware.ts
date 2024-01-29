import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
config()

const confidentialPassword = process.env.MYPLAINTEXTPASSWORD

export const isAuth = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: 'No estas autorizado!' })
  }

  jwt.verify(token, confidentialPassword, (err, decoded) => {
    if (err) {
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
  })
}
