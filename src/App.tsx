
import { useCallback, useEffect, useRef, useState } from "react";
import { FloatingBadge } from "./components/FloatingBadge";
import { HardwareHUD } from "./components/HardwareHUD";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { Sections } from "./components/Sections";
import {
  PrecisionEngine,
  type LabelState,
} from "./three/PrecisionEngine";
import { setMuted } from "./three/audio";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PrecisionEngine | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hold, setHold] = useState(0);
  const [blueprint, setBlueprint] = useState(false);
  const [labels, setLabels] = useState<LabelState[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [reveals, setReveals] = useState({
    presnost: true,
    detail: false,
    konstrukce: false,
    realizace: false,
    poptavka: false,
  });

  const onHoldChange = useCallback((v: number) => setHold(v), []);
  const onBlueprintChange = useCallback((v: boolean) => setBlueprint(v), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new PrecisionEngine(canvas);
    engineRef.current = engine;
    engine.setLabelCallback(setLabels);
    engine.setReadyCallback(() => setReady(true));
    void engine.init().then(() => engine.start());

    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const t = window.scrollY / max;
      setProgress(t);
      engine.setProgress(t);

      const y = window.scrollY;
      const vh = window.innerHeight;
      setReveals({
        presnost: true,
        detail: y > vh * 0.35,
        konstrukce: y > vh * 1.15,
        realizace: y > vh * 2.0,
        poptavka: y > vh * 2.85,
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

  useEffect(() => {
    setMuted(!soundOn);
  }, [soundOn]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-bg"
      >
        Přeskočit na obsah
      </a>

      <Loader ready={ready} />

      <main className="relative overflow-x-clip bg-[#080809] text-[#F4F1EA]">
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-0 h-full w-full"
          aria-hidden
        />

        <div className="relative z-10" id="main">
          <Nav soundOn={soundOn} onSoundChange={setSoundOn} />
          <Sections reveals={reveals} />
          <footer className="wrap border-t border-line py-8 text-sm text-muted">
            Ukázkový koncept webu • Vytvořil Honza | Webanyl
          </footer>
        </div>

        <HardwareHUD
          hold={hold}
          blueprint={blueprint}
          labels={labels}
          onHoldChange={onHoldChange}
          onBlueprintChange={onBlueprintChange}
          visible={ready && progress < 0.95}
        />
        <FloatingBadge />
      </main>
    </>
  );
}
