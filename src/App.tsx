import { Categories } from "./components/Categories";
import { Contact } from "./components/Contact";
import { FloatingBadge } from "./components/FloatingBadge";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Process } from "./components/Process";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-bg"
      >
        Přeskočit na obsah
      </a>

      <div className="relative overflow-x-clip bg-bg text-ink">
        <Nav />
        <main id="main">
          <Hero />
          <Categories />
          <Gallery />
          <Process />
          <Contact />
        </main>
        <footer className="wrap border-t border-line py-8 text-sm text-muted">
          Ukázkový koncept webu • Vytvořil Honza | Webanyl
        </footer>
        <FloatingBadge />
      </div>
    </>
  );
}
