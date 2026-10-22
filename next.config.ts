import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Politique de sécurité du contenu (CSP). Les pages sont générées à l'avance : pas de « nonce »
 * possible, et Next comme le script du thème s'exécutent en ligne, d'où 'unsafe-inline' pour les
 * scripts (recommandation de la doc Next 16). Tout le reste est verrouillé : aucun script, style,
 * police ou image venu d'ailleurs, et Calendly comme seul cadre autorisé.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://calendly.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // HTTPS obligatoire pendant un an, sans les sous-domaines (même choix que la page d'attente).
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Doublon de frame-ancestors pour les navigateurs anciens : le site ne s'affiche dans aucun cadre.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // En développement, Next écrit chaque appel de Server Action avec ses arguments : la saisie
  // du formulaire de contact se retrouverait dans le terminal.
  logging: { serverFunctions: false },
  // Ne pas annoncer « X-Powered-By: Next.js » à chaque réponse.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
