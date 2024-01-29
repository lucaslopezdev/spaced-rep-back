/*
nivel 1: todos los dias
nivel 2: dia por medio
nivel 3: cada 4 dias
nivel 4: semanal
nivel 5: quincenal
nivel 6: mensual
nivel 7: bimestral
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../db";
const frecuency = [0, 2, 4, 7, 15, 30, 60];
export function updateCardFrecuency(card, answer) {
    if (!answer) {
        card.next_review_interval = 0;
        return card;
    }
    card.next_review_interval = frecuency[card.level];
    return card;
}
export function decrementNextReviewCard() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cards = yield pool.query('SELECT * FROM cards');
            for (const card of cards.rows) {
                if (card.next_review_interval !== 0) {
                    card.next_review_interval--;
                    yield pool.query('UPDATE cards SET next_review_interval = $1 WHERE card_id = $2', [card.next_review_interval, card.card_id]);
                }
            }
            return cards.rows;
        }
        catch (error) {
            console.error('Error al actualizar las tarjetas:', error);
            throw error;
        }
    });
}
