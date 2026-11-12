export const VAT_RATE = 20;

// from = "à partir de", unit = prix par mois
export type Price = {
  amount: number;
  from?: boolean;
  unit?: "mois";
};

const NBSP = "\u00a0";

export function euros(amount: number) {
  const digits = Number.isInteger(amount) ? 0 : 2;
  const number = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
  // l'espace fine d'Intl est presque invisible en Big Shoulders
  return `${number.replace(/\u202f/g, NBSP)}${NBSP}€`;
}

// calcul en centimes : pas d'erreur d'arrondi
export function withVat(amount: number) {
  return Math.round(amount * (100 + VAT_RATE)) / 100;
}
