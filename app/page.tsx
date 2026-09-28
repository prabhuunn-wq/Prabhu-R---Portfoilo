import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";


export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}