import { getToday } from './getToday.js'

// Brings up only cards that have not been reviewed today.
export function getDailyCards(cards) {
  return cards.filter(
    (card) => card.last_review !== getToday() && card.next_review_interval === 0
  )
}
