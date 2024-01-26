/* 
nivel 1: todos los dias
nivel 2: dia por medio
nivel 3: cada 4 dias
nivel 4: semanal
nivel 5: quincenal
nivel 6: mensual
nivel 7: bimestral
*/

import { pool } from "../db.js"

const frecuency = [0, 2, 4, 7, 15, 30, 60]

export function updateCardFrecuency(card, answer) {
  if (!answer) {
    card.next_review_interval = 0
    return card
  }
  card.next_review_interval = frecuency[card.level]
  return card
}

export async function decrementNextReviewCard() {
  try {
    const cards = await pool.query('SELECT * FROM cards');

    for (const card of cards.rows) {
      if (card.next_review_interval !== 0) {
        card.next_review_interval--;

        await pool.query(
          'UPDATE cards SET next_review_interval = $1 WHERE card_id = $2', 
          [card.next_review_interval, card.card_id]
        );
      }
    }

    return cards.rows;
  } catch (error) {
    console.error('Error al actualizar las tarjetas:', error);
    throw error;
  }
}
