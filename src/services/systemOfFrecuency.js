/* 
nivel 1: todos los dias
nivel 2: dia por medio
nivel 3: cada 4 dias
nivel 4: semanal
nivel 5: quincenal
nivel 6: mensual
nivel 7: bimestral
*/

const frecuency = [1, 2, 4, 7, 15, 30, 60]

export function updateCardsFrecuency(cards) {
  return cards.map((card) => (card.nextReviewInto = frecuency[card.level]))
}

export function decrementNextReviewCard(cards) {
  return cards.map((card) => card.nextReviewInto--)
}
