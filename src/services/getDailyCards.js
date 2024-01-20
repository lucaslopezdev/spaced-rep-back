// Brings up only cards that have not been reviewed today.
export function getDailyCards(cards) {
  return cards.filter(card => card.lastReview !== new Date().getDate())
}