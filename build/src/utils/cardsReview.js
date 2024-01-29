import { updateCardFrecuency } from "../services/systemOfFrecuency.js";
import { upgradeCardLevel } from "../services/updateCardLevel";
import { updateLastReview } from "../services/updateLastReview";
export function cardReview(card, answer) {
    upgradeCardLevel(card, answer);
    updateCardFrecuency(card, answer);
    updateLastReview(card, answer);
    return card;
}
