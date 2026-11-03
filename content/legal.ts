/** Identité de l'éditrice (attestation d'immatriculation au RNE), reprise par les pages légales et le pied de page. */
export const legal = {
  name: "Laura Fontaine",
  status: "entrepreneur individuel (EI)",
  address:
    "401 Chemin de la Gare, Bâtiment C, Appartement C24, 83470 Saint-Maximin-la-Sainte-Baume, France",
  phone: "06 37 58 18 25",
  phoneHref: "tel:+33637581825",
  siren: "132 093 071",
  siret: "132 093 071 00018",
  registeredOn: "27 octobre 2026",
  ape: "6201Z, programmation informatique",
  /** null tant que l'option pour la TVA n'a pas donné de numéro : les pages affichent « à compléter ». */
  vatNumber: null as string | null,
};

/** Pages légales, dans l'ordre du menu de gauche. */
export const legalPages = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/cgv", label: "Conditions générales de vente" },
] as const;

export type LegalPath = (typeof legalPages)[number]["href"];
