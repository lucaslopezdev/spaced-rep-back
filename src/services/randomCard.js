const cards = [
  {
    word: 'Hi',
    solution: 'Hola',
    level: 0,
    lastReview: 18,
  },
  {
    word: 'Bye',
    solution: 'Adios',
    level: 0,
    lastReview: 19,
  },
  {
    word: 'Good',
    solution: 'Bien',
    level: 0,
    lastReview: 18,
  },
]

// Recieves an array and returns an object in a random position within it 
export function randomCard(cards) {
  return cards[Math.floor(Math.random() * cards.length)]
}