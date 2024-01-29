import { getToday } from './getToday'
import { Card } from '../types'

// Brings up only cards that have not been reviewed today.
export function getDailyCards(cards: Card[]): Card[] {
  return cards.filter(
    (card) => card.last_review !== getToday() && card.next_review_interval === 0
  )
}
