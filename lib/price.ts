/** Taux de TVA ajouté aux prix HT (Flaura.dev facture la TVA dès son lancement, le 1er janvier 2027). */
export const VAT_RATE = 20;

/**
 * Prix HT. amount seul : prix fixe. from : « à partir de ». unit : prix par mois.
 */
export type Price = {
  amount: number;
  from?: boolean;
  unit?: "mois";
};

// Espace insécable : « € » reste collé au montant.
const NBSP = "\u00a0";

/** « 1 200 € », « 58,80 € » : centimes seulement s'il y en a. */
export function euros(amount: number) {
  const digits = Number.isInteger(amount) ? 0 : 2;
  const number = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
  // Séparateur de milliers : espace insécable normale, l'espace fine d'Intl (U+202F) disparaît
  // presque en Big Shoulders.
  return `${number.replace(/\u202f/g, NBSP)}${NBSP}€`;
}

/** Montant TTC d'un prix HT, arrondi au centime (calcul en centimes : pas d'erreur d'arrondi). */
export function withVat(amount: number) {
  return Math.round(amount * (100 + VAT_RATE)) / 100;
}
