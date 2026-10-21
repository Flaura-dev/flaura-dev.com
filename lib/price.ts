/** Taux de TVA ajouté aux prix HT (Flaura.dev facture la TVA dès son lancement, le 1er janvier 2027). */
export const VAT_RATE = 20;

/**
 * Prix HT. amount seul : prix fixe. from : « dès ». upTo : fourchette (amount à upTo).
 * unit : prix par page, par mois ou par jour.
 */
export type Price = {
  amount: number;
  from?: boolean;
  upTo?: number;
  unit?: "page" | "mois" | "jour";
};

// Espace insécable : « € », « HT » et « / mois » restent collés au montant.
const NBSP = "\u00a0";

/** « 1 200 € », « 58,80 € » : centimes seulement s'il y en a. */
export function euros(amount: number) {
  const digits = Number.isInteger(amount) ? 0 : 2;
  const number = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
  // Séparateur de milliers : espace insécable normale, l'espace fine d'Intl disparaît presque en Big Shoulders.
  return `${number.replace(/ /g, NBSP)}${NBSP}€`;
}

/** Montant TTC d'un prix HT, arrondi au centime (calcul en centimes : pas d'erreur d'arrondi). */
export function withVat(amount: number) {
  return Math.round(amount * (100 + VAT_RATE)) / 100;
}

/** « dès 3 500 € HT », « 300 à 800 € HT », « 150 € HT / page ». */
export function formatPrice({ amount, from, upTo, unit }: Price) {
  const value = upTo ? `${euros(amount).replace(`${NBSP}€`, "")} à ${euros(upTo)}` : euros(amount);
  return `${from ? `dès${NBSP}` : ""}${value}${NBSP}HT${unit ? `${NBSP}/ ${unit}` : ""}`;
}
