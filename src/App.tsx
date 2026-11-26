import { Contact } from "./components/Contact";
import { FloatingBadge } from "./components/FloatingBadge";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Process } from "./components/Process";
import { Services } from "./components/Services";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-3 focus:text-ink-dark"
      >
        Přeskočit na obsah
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
      <FloatingBadge />
    </>
  );
}
