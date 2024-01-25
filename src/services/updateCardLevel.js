// Works over current card, if you voted ✅ upgrade the card, if not ❌ reset the card to level 0;
// Max level is 6.
export function upgradeCardLevel(card, result) {
  if (!result) {
    card.level = 0
    return
  }

  if (result) {
    card.level = 6 ? (card.level = 6) : card.level++
    return
  }
}
