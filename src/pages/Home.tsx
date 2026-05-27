import Hero from "@/components/sections/Hero";
import MiniBio from "@/components/sections/MiniBio";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <MiniBio />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
