import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// L'axe opsz est nécessaire pour obtenir le dessin « Display » (opsz 72).
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Flaura.dev — Développeuse web freelance dans le Var",
    template: "%s · Flaura.dev",
  },
  description:
    "Laura Fontaine, développeuse web freelance dans le Var : création et refonte de sites pour les TPE, indépendants et petites entreprises, partout en France en remote.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: "/",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLORS.dark,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${bigShoulders.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#contenu"
          className="sr-only rounded-full bg-pink px-5 py-3 font-semibold text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Aller au contenu
        </a>
        <Header />
        {/* Sur desktop, la colonne de droite (88 px) est réservée au fil conducteur. */}
        <div className="overflow-x-clip md:pr-[88px]">{children}</div>
      </body>
    </html>
  );
}
