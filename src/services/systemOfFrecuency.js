/* <- Dia: Level 2, 1  
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 4, 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 5, 1
<- Dia: Level 4, 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 2, 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 4, 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 6, 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 5, 1
<- Dia: Level 4, 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 4, 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 5, 1
<- Dia: Level 4, 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 4, 1
<- Dia: Level 2, 1
<- Dia: Level 3, 1
<- Dia: Level 2, 1
<- Dia: Level 7, 1
*/ 

/* 

dos: veintinueve. frecuencia: 2 dias. con el dia 16 extra (dias:1, 3, 5, 7, 9, 11, 13, 15, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55)
tres: catorce. frecuencia: 4 dias. (dias: 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54) 
cuatro: siete. frecuencia: 9,7,9,7,9,7 (dias: 4, 13, 20, 29, 36, 45, 52)
cinco: tres. frecuencia: 16 dias. (dias: 12, 28, 44)
seis: uno. frecuencia: 28 dias. frecuencia:  (dia 24)
siete: frecuencia: 56 dias. 1 (dia 56)
*/

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

export function updateCardsFrecuency (cards) {
  return cards.map(card => card.nextReviewInto = frecuency[card.level])
}

export function decrementNextReviewCard (cards) {
  return cards.map(card => card.nextReviewInto--)
}