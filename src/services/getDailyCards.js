import { getToday } from "./getToday.js"

// Brings up only cards that have not been reviewed today.
export function getDailyCards(cards) {
  return cards.filter(card => card.lastReview !== getToday() && card.nextReviewInto === 0)
}