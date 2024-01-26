// Works over current card, if you voted ✅ upgrade the card, if not ❌ reset the card to level 0;
// Max level is 6.
export function upgradeCardLevel(card, answer) {
  if (!answer) {
    card.level = 0
    return card
  }

  if(card.level === 6) return card;
  else card.level ++

  return card
}
