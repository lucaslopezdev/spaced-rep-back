import { updateCardFrecuency } from "../services/systemOfFrecuency.js";
import { upgradeCardLevel } from "../services/updateCardLevel.js";
import { updateLastReview } from "../services/updateLastReview.js";

export function cardReview (card, answer) {
    upgradeCardLevel(card, answer)
    updateCardFrecuency(card, answer)
    updateLastReview(card, answer)

    return card
}