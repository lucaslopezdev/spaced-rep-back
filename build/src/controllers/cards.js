var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from 'crypto';
import { pool } from '../db.js';
import { getDailyCards } from '../services/getDailyCards.js';
import { randomCard } from '../services/randomCard.js';
import { cardReview } from '../utils/cardsReview.js';
export class CardController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { albumId } = req.params;
            const result = yield pool.query('SELECT * FROM cards WHERE user_id = $1 AND album_id = $2', [userId, albumId]);
            if (!result.rowCount) {
                return res.status(404).json({ message: 'No hay cards en este album' });
            }
            // Aca tal vez, podriamos mandar las cards del album a cardsReview o desde alla hacer la llamada a este getAll, ya veremos
            res.status(200).json(result.rows);
        });
    }
    static getCardById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cardId, albumId } = req.params;
            const result = yield pool.query('SELECT card_id, name, solution, level, last_review, next_review_interval, user_id, album_id FROM cards WHERE card_id = $1 AND album_id = $2', [cardId, albumId]);
            if (!result.rowCount) {
                return res.status(404).json({ message: 'No se encontró la tarjeta' });
            }
            return res.status(200).json(result.rows[0]);
        });
    }
    static getCardsToReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const userId = req.userId;
            const { albumId } = req.params;
            const result = yield pool.query('SELECT * FROM cards WHERE album_id = $1 AND user_id = $2', [albumId, userId]);
            const card = yield randomCard(getDailyCards(result.rows));
            return res.status(200).json(card);
        });
    }
    static sendAnswerCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { albumId } = req.params;
            const { card_id, answer } = req.body;
            const currentlyCard = yield pool.query('SELECT * FROM cards WHERE album_id = $1 AND card_id = $2 AND user_id = $3', [albumId, card_id, userId]);
            const cardReviewed = currentlyCard.rows[0];
            console.log({ cardReviewed });
            const resultCard = yield cardReview(cardReviewed, answer);
            const result = yield pool.query('UPDATE cards SET last_review = $1, next_review_interval = $2, level = $3 WHERE album_id = $4 AND card_id = $5 AND user_id = $6 RETURNING *', [resultCard.last_review, resultCard.next_review_interval, resultCard.level, albumId, card_id, userId]);
            return res.status(200).json(result.rows[0]);
        });
    }
    static createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { albumId } = req.params;
            const { name, solution } = req.body;
            const randomUuid = crypto.randomUUID();
            const lastReview = null;
            const nextReviewInto = 0;
            const level = 0;
            console.log(req.params);
            const result = yield pool.query('INSERT INTO cards(album_id, user_id, card_id, name, solution, last_review, next_review_interval, level) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [
                albumId,
                userId,
                randomUuid,
                name,
                solution,
                lastReview,
                nextReviewInto,
                level
            ]);
            console.log(result);
            res.status(201).json(result.rows[0]);
        });
    }
    static updateCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, solution } = req.body;
            const { albumId, cardId } = req.params;
            const userId = req.userId;
            const result = yield pool.query('UPDATE cards SET name = $1, solution = $2 WHERE user_id = $3 AND album_id = $4 AND card_id = $5 RETURNING *', [name, solution, userId, albumId, cardId]);
            if (!result.rowCount) {
                return res
                    .status(404)
                    .json({ message: 'La tarjeta no existe o no te pertenece' });
            }
            return res.status(200).json(result.rows[0]);
        });
    }
    static deleteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { albumId, cardId } = req.params;
            const userId = req.userId;
            const result = yield pool.query('DELETE FROM cards WHERE user_id = $1 AND album_id = $2 AND card_id = $3 RETURNING *', [userId, albumId, cardId]);
            if (!result.rowCount) {
                return res
                    .status(404)
                    .json({ message: 'La tarjeta no existe o no puedes eliminarla' });
            }
            return res.sendStatus(204);
        });
    }
}
