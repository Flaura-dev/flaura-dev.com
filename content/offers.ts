// Les espaces insécables ( ) évitent qu'un « ? » ou un « € » se retrouve seul en début de ligne.
export const offers = [
  {
    num: "01",
    title: "Création de site",
    text: "Un site pensé pour votre activité, de la maquette à la mise en ligne.",
    features: ["design sur-mesure", "développement et hébergement", "bases SEO / GEO"],
    price: "dès [TARIF] €",
  },
  {
    num: "02",
    title: "Refonte",
    text: "Votre site ne vous ressemble plus ? On repart sur de bonnes bases.",
    features: [
      "audit de l’existant",
      "nouvelle direction visuelle",
      "performance et référencement",
    ],
    price: "dès [TARIF] €",
  },
  {
    num: "03",
    title: "Suivi et maintenance",
    text: "Votre site reste à jour, sécurisé et en ligne, sans que vous ayez à y penser.",
    features: ["mises à jour et sécurité", "hébergement géré", "petites évolutions"],
    price: "[TARIF] € / mois",
  },
] as const;
