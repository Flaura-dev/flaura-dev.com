import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SakuraPetals } from "@/components/layout/SakuraPetals";
import { ScrollRail } from "@/components/layout/ScrollRail";
import { site } from "@/content/site";
import { openGraphBase } from "@/lib/metadata";
import { preferencesInitScript, THEME_COLORS } from "@/lib/theme";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "block",
  adjustFontFallback: false, // secours faits main dans globals.css
});

export const metadata: Metadata = {
  metadataBase: new URL(site.servedUrl),
  title: {
    default: site.title,
    template: "%s · Flaura.dev",
  },
  description: site.description,
  robots: site.indexable ? undefined : { index: false, follow: false },
  openGraph: openGraphBase,
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
        <script dangerouslySetInnerHTML={{ __html: preferencesInitScript }} />
      </head>
      <body className="min-h-dvh">
        {site.petals && <SakuraPetals />}
        <a
          href="#contenu"
          className="sr-only rounded-full bg-pink px-5 py-3 font-semibold text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Aller au contenu
        </a>
        <Header />
        {/* 88 px à droite pour le fil conducteur */}
        <div className="overflow-x-clip md:pr-[88px]">
          {children}
          <Footer />
        </div>
        <ScrollRail />
      </body>
    </html>
  );
}
