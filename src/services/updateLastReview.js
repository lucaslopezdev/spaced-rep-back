
export function updateLastReview (cards) {
  return cards.map(card => card.lastReview = new Date().getDate())
}