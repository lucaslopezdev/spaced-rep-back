import { Card } from "../types"

// Recieves an array and returns an object in a random position within it
export function randomCard(cards: Card[]): Card {
  return cards[Math.floor(Math.random() * cards.length)]
}
