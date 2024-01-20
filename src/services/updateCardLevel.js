
// Works over current card, if you voted ✅ upgrade the card, if not ❌ reset the card to level 0;
// Max level is 7.
export function upgradeCardLevel (card, result) {
  if (!result) {
    card.level = 0;
    return;
  }

  if(result) {
    card.level = 7 ? card.level = 7 : card.level++
    return;
  }
}

