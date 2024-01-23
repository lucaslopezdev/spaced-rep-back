import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { pool } from '../db.js'
import { createAccessToken } from '../libs/jwt.js'

export class AuthController {
  static async signin(req, res) {
    const { email, password } = req.body

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    if (!result.rowCount) {
      return res.status(404).json({
        message: 'El correo no esta registrado'
      })
    }

    const validPassword = bcrypt.compare(password, result.rows[0].password)

    if (!validPassword) {
      return res.status(400).json({ message: 'La contraseña es incorrecta.' })
    }

    const token = await createAccessToken({ id: result.rows[0].user_id })

    res.cookie('token', token, {
      httpOnly: true,
      //secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    return res.json(result.rows[0])
  }

  static async singup(req, res) {
    const { name, email, password } = req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const randomUserId = crypto.randomUUID()

      const result = await pool.query(
        'INSERT INTO users(name, email, password, user_id) VALUES($1, $2, $3, $4) RETURNING *',
        [name, email, hashedPassword, randomUserId]
      )

      const token = await createAccessToken({ id: result.rows[0].user_id })

      res.cookie('token', token, {
        httpOnly: true,
        //secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })

      return res.json(result.rows[0])
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'El correo ya esta registrado' })
      }
      next(error)
    }
  }

  static async logout(_req, res) {
    res.clearCookie('token')
    res.sendStatus(200)
  }

  static async profile(req, res) {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      req.userId
    ])
    return res.json(result.rows[0])
  }
}
