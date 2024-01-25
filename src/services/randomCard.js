// Recieves an array and returns an object in a random position within it
export function randomCard(cards) {
  return cards[Math.floor(Math.random() * cards.length)]
}
