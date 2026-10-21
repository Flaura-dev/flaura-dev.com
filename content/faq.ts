// Source unique de la FAQ : le texte affiché et les données structurées FAQPage
// (components/sections/Faq.tsx) en sont tirés, pour qu'ils restent toujours identiques.
// La première question est ouverte par défaut (maquette).
// Les prix viennent de content/offers.ts : ils changent ici en même temps que sur les cartes.

import { currentPrice, launch, maintenancePlans, plans, redesign } from "@/content/offers";
import { euros } from "@/lib/price";

const [essentiel, visibilite, pro] = plans.map((plan) => plan.price);
const [serenite, evolution] = maintenancePlans.map((formula) => formula.price.amount);
const launchPrices = launch.active
  ? ` (−${launch.discount} % pendant le lancement : ${euros(currentPrice(essentiel))}, ${euros(currentPrice(visibilite))} et ${euros(currentPrice(pro))} HT)`
  : "";

// a : texte de la réponse. list (optionnel) : liste à puces affichée après a. after (optionnel) : texte affiché après la liste.
type FaqItem = { q: string; a: string; list?: string[]; after?: string };

export const faq: FaqItem[] = [
  {
    q: "Comment se déroule la création d'un site internet avec Flaura.dev ?",
    a: "En cinq étapes :",
    list: [
      "Un café virtuel de 30 minutes pour comprendre ton activité",
      "Un devis détaillé",
      "Une maquette que tu valides",
      "Le développement",
      "La mise en ligne",
    ],
    after:
      "Avant le web, j'ai été cheffe de projets en bureau d'études, où l'on ne lance jamais un chantier sans plan validé. Je travaille pareil : tu vois ton site avant qu'il parte en production.",
  },
  {
    q: "Combien coûte la création d'un site vitrine ?",
    a: `Un site vitrine d'une seule page démarre à partir de ${euros(essentiel)} HT, un site jusqu'à 5 pages à partir de ${euros(visibilite)} HT, et un site jusqu'à 10 pages à partir de ${euros(pro)} HT${launchPrices}. Le prix final dépend de ce que ton site doit faire pour toi (fonctionnalités, contenus à créer) : après notre échange, tu reçois un devis gratuit et détaillé ligne par ligne. Le paiement se fait en trois fois (30 % au démarrage, 40 % à la validation de la maquette, 30 % à la livraison), et si une demande sort du devis, je te le dis avant de m'y mettre.`,
  },
  {
    q: "Combien coûte la refonte d'un site internet existant ?",
    a: `Une refonte reprend le tarif de l'offre qui correspond à ton futur site (à partir de ${euros(essentiel)}, ${euros(visibilite)} ou ${euros(pro)} HT selon le nombre de pages), auquel s'ajoutent ${euros(redesign.price.amount)} HT pour l'audit, la migration et les redirections. Je commence par repérer ce qui coince sur ton site actuel : lenteur, affichage sur mobile, design daté, peu de demandes de contact. Puis je reconstruis en gardant ce qui marche, y compris le référencement que tu as déjà acquis : tes anciennes adresses sont redirigées vers les nouvelles pour que Google ne perde pas ta trace.`,
  },
  {
    q: "Combien de temps faut-il pour créer un site internet ?",
    a: "Ça dépend de la taille du projet, mais tu as un planning daté dès le devis et tu sais à tout moment où on en est. S'il y a un imprévu, je préfère te prévenir trois semaines avant que trois jours après.",
  },
  {
    q: "Mon site sera-t-il bien référencé sur Google ?",
    a: "Oui, parce que le référencement naturel (SEO) est pensé dès la conception, pas ajouté à la fin. Ton site est rapide, adapté au mobile, structuré proprement, et il contient les données qui aident Google comme les IA à comprendre qui tu es, ce que tu fais et où. Personne d'honnête ne peut te promettre la première place, mais tu pars avec des bases que beaucoup de sites n'ont pas.",
  },
  {
    q: "Est-ce que je pourrai modifier mon site moi-même ?",
    a: "Oui, pour tout ce qui bouge souvent chez toi : actualités, photos, horaires, réalisations… On définit ensemble au départ ce que tu veux gérer seul, et je te prépare un espace simple pour le faire, sans toucher au code.",
  },
  {
    q: "À qui appartient le site une fois livré ?",
    a: "À toi. Ton nom de domaine et ton hébergement sont à ton nom, sur ton propre compte, et tu me donnes simplement un accès. Une fois le projet réglé, je te remets le code et les droits : si un jour tu veux changer de prestataire, tu pars avec tout.",
  },
  {
    q: "Proposes-tu la maintenance de mon site après la mise en ligne ?",
    a: `Oui, avec deux formules mensuelles pour que tu n'aies plus à gérer ton site seul. La formule Sérénité, à ${euros(serenite)} HT par mois, couvre les mises à jour, les sauvegardes et la correction des bugs. La formule Évolution, à ${euros(evolution)} HT par mois, comprend tout ça plus une heure de petites modifications chaque mois. Ton hébergement reste à ton nom et à ta charge : je m'en occupe grâce à l'accès administrateur que tu me donnes. Et si tu préfères t'en charger toi-même, je ne disparais pas pour autant : je te montre comment tout fonctionne, et le jour où tu as besoin d'une évolution ou d'un coup de main, on reprend un café et on en discute.`,
  },
  {
    q: "Où intervient Flaura.dev ?",
    a: "Je suis développeuse web freelance à Saint-Maximin-la-Sainte-Baume, dans le Var. J'accompagne les entreprises du Var et de la région PACA (Toulon, Brignoles, Aix-en-Provence, Marseille…) et je travaille aussi à distance partout en France, en visio ou par e-mail. Je travaille uniquement avec des professionnels : indépendants, artisans, commerçants, TPE et PME.",
  },
  {
    q: "Comment démarrer mon projet de site internet ?",
    a: "En réservant un café virtuel de 30 minutes, gratuit et sans engagement. J'aurai regardé ton site avant (ou constaté que tu n'en as pas encore), et tu repartiras au minimum avec un regard neuf sur ta présence en ligne. Si un site n'est pas la bonne réponse à ton problème, je te le dirai.",
  },
];
