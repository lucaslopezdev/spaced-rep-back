var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { pool } from '../db.js';
import { createAccessToken } from '../libs/jwt.js';
export class AuthController {
    static signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield pool.query('SELECT * FROM users WHERE email = $1', [
                email
            ]);
            if (!result.rowCount) {
                return res.status(404).json({
                    message: 'El correo no esta registrado'
                });
            }
            const validPassword = bcrypt.compare(password, result.rows[0].password);
            if (!validPassword) {
                return res.status(400).json({ message: 'La contraseña es incorrecta.' });
            }
            const token = yield createAccessToken({ id: result.rows[0].user_id });
            res.cookie('token', token, {
                httpOnly: true,
                //secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            return res.json(result.rows[0]);
        });
    }
    static singup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const hashedPassword = yield bcrypt.hash(password, 10);
                const randomUserId = crypto.randomUUID();
                const result = yield pool.query('INSERT INTO users(name, email, password, user_id) VALUES($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, randomUserId]);
                const token = yield createAccessToken({ id: result.rows[0].user_id });
                res.cookie('token', token, {
                    httpOnly: true,
                    //secure: true,
                    sameSite: 'none',
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });
                return res.json(result.rows[0]);
            }
            catch (error) {
                if (error.code === '23505') {
                    return res.status(400).json({ message: 'El correo ya esta registrado' });
                }
                next(error);
            }
        });
    }
    static logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token');
            res.sendStatus(200);
        });
    }
    static profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query('SELECT * FROM users WHERE user_id = $1', [
                req.userId
            ]);
            return res.json(result.rows[0]);
        });
    }
}
