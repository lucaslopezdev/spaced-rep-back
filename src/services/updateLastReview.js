import { getToday } from './getToday.js'

export function updateLastReview(cards) {
  return cards.map((card) => (card.lastReview = getToday()))
}
