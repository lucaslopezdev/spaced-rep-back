import { updateCardFrecuency } from "../services/systemOfFrecuency.js";
import { upgradeCardLevel } from "../services/updateCardLevel";
import { updateLastReview } from "../services/updateLastReview";
import { Card } from "../types.js"

export function cardReview (card: Card, answer: boolean): Card {
    upgradeCardLevel(card, answer)
    updateCardFrecuency(card, answer)
    updateLastReview(card, answer)

    return card
}