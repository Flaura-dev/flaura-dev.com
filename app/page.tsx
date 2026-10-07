import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Offers } from "@/components/sections/Offers";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";

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
    </main>
  );
}
