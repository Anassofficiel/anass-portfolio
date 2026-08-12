import { createFileRoute } from "@tanstack/react-router";
import { SoundProvider } from "@/lib/sound";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { HandCursor } from "@/components/HandCursor";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { WhyMe } from "@/components/sections/WhyMe";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const TITLE = "ANASS DEV | Digital Solutions Developer & AI Automation Specialist";
const DESC =
  "Personal portfolio website of Anass El Fatihi, Digital Solutions Developer and AI Automation Specialist.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Anass El Fatihi",
          jobTitle: "Digital Solutions Developer & AI Automation Specialist",
          email: "mailto:anassfatihi2026@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Casablanca",
            addressCountry: "MA",
          },
          sameAs: [
            "https://www.linkedin.com/in/mc-anass-fatihi-325432316/",
            "https://github.com/Anassofficiel",
          ],
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <SoundProvider>
      <ScrollProgress />
      <CursorSpotlight />
      <HandCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Skills />
        <Projects />
        <Services />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
    </SoundProvider>
  );
}
