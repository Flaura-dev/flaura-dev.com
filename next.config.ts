import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // En développement, Next écrit chaque appel de Server Action avec ses arguments : la saisie
  // du formulaire de contact se retrouverait dans le terminal.
  logging: { serverFunctions: false },
};

export default nextConfig;
