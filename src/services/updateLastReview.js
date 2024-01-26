import { getToday } from './getToday.js'

export async function updateLastReview(card, answer) {
  if (!answer) return card;

  card.last_review = getToday()
  return card;
}
