import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

export default function Home() {
  return (
    <main className="main-viewport">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Process />
      <Capabilities />
      <Contact />
      <Footer />
      <FloatingNav />
    </main>
  );
}
