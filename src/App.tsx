import { useCallback, useEffect, useRef, useState } from "react";
import { Contact } from "./components/Contact";
import { FloatingBadge } from "./components/FloatingBadge";
import { HardwareHUD } from "./components/HardwareHUD";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Process } from "./components/Process";
import { Showroom } from "./components/Showroom";
import {
  HardwareEngine,
  type LabelProjection,
} from "./three/HardwareEngine";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<HardwareEngine | null>(null);
  const [progress, setProgress] = useState(0);
  const [hold, setHold] = useState(0);
  const [blueprint, setBlueprint] = useState(false);
  const [labels, setLabels] = useState<LabelProjection[]>([]);
  const [reveals, setReveals] = useState({
    hero: true,
    showroom: false,
    process: false,
    contact: false,
  });

  const onHoldChange = useCallback((v: number) => setHold(v), []);
  const onBlueprintChange = useCallback((v: boolean) => setBlueprint(v), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new HardwareEngine(canvas);
    engineRef.current = engine;
    engine.setLabelCallback(setLabels);
    engine.start();

    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const t = window.scrollY / max;
      setProgress(t);
      engine.setProgress(t);

      // Reveal from scrollY — never IntersectionObserver
      const y = window.scrollY;
      setReveals({
        hero: true,
        showroom: y > window.innerHeight * 0.15,
        process: y > window.innerHeight * 1.4,
        contact: y > window.innerHeight * 2.4,
      });
    };

    const onResize = () => engine.resize();
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      engine.setPointer(nx, ny);
    };

    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setHold(hold);
  }, [hold]);

  useEffect(() => {
    engineRef.current?.setBlueprint(blueprint);
  }, [blueprint]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-3 focus:text-ink-dark"
      >
        Přeskočit na obsah
      </a>

      <main className="relative overflow-x-clip bg-[#0B0A09] text-[#F5F2EB]">
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85"
          aria-hidden
        />

        <div className="relative z-10" id="main">
          <Nav />
          <Hero reveal={reveals.hero} />
          <Showroom reveal={reveals.showroom} />
          <Process reveal={reveals.process} />
          <Contact reveal={reveals.contact} />
        </div>

        <HardwareHUD
          hold={hold}
          blueprint={blueprint}
          labels={labels}
          onHoldChange={onHoldChange}
          onBlueprintChange={onBlueprintChange}
          visible={progress < 0.9}
        />
        <FloatingBadge />
      </main>
    </>
  );
}
