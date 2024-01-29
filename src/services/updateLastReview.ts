import { Card } from '../types.js'
import { getToday } from './getToday.js'

export async function updateLastReview(card:Card, answer: boolean): Promise<Card> {
  if (!answer) return card;

  card.last_review = getToday()
  return card;
}
