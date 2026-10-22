import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Offers } from "@/components/sections/Offers";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageUrls } from "@/lib/metadata";
import { homeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = pageUrls("/");

export default function Home() {
  return (
    <main id="contenu">
      <Hero />
      <Process />
      <About />
      <Projects />
      <Offers />
      <Faq />
      <Contact />
      <JsonLd data={homeStructuredData} />
    </main>
  );
}
