import { clientsMarquee, skillsMarquee } from "@/data/content";
import { CtaBand } from "@/components/CtaBand";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { ScrollEngine } from "@/components/ScrollEngine";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <div className="grain" />
      <div id="cursor" />
      <div id="cursor-ring" />
      <div className="scroll-progress">
        <div className="scroll-progress-fill" />
      </div>
      <Nav />
      <main>
        <Hero />
        <Marquee items={skillsMarquee} />
        <Stats />
        <Work />
        <Marquee items={clientsMarquee} />
        <Experience />
        <CtaBand />
      </main>
      <Footer />
      <ScrollEngine />
      <Motion />
    </>
  );
}
