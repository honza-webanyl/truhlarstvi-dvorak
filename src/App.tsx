import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContactOutro } from "./components/ContactOutro";
import { FloatingBadge } from "./components/FloatingBadge";
import { HoldControl } from "./components/HoldControl";
import { CHAPTERS, DIMS, SITE } from "./data";
import { FurnitureEngine } from "./three/FurnitureEngine";

function activeChapterIndex(progress: number) {
  let idx = 0;
  for (let i = 0; i < CHAPTERS.length; i++) {
    if (progress + 0.04 >= CHAPTERS[i].at) idx = i;
  }
  return idx;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FurnitureEngine | null>(null);
  const [progress, setProgress] = useState(0);
  const [hold, setHold] = useState(0);
  const onHoldChange = useCallback((v: number) => setHold(v), []);

  const chapterIdx = useMemo(() => activeChapterIndex(progress), [progress]);
  const storyIdx = Math.min(chapterIdx, 3);
  const chapter = CHAPTERS[storyIdx];
  const showDims = progress > 0.45 && progress < 0.82;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new FurnitureEngine(canvas);
    engineRef.current = engine;
    engine.start();

    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const t = window.scrollY / max;
      setProgress(t);
      engine.setProgress(t);
    };

    const onResize = () => engine.resize();
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setHold(hold);
  }, [hold]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-3 focus:text-ink-dark"
      >
        Přeskočit na obsah
      </a>

      <main
        id="main"
        className="relative overflow-x-clip bg-[#0B0A09] text-[#F5F2EB]"
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-0 h-full w-full"
          aria-hidden
        />

        <div className="relative z-10">
          <header className="pointer-events-none fixed inset-x-0 top-0 z-30">
            <div className="wrap flex h-16 items-center justify-between md:h-[4.25rem]">
              <p className="pointer-events-auto text-sm font-semibold tracking-tight">
                {SITE.name}
              </p>
              <a
                href={SITE.phoneHref}
                className="btn btn-ghost pointer-events-auto !min-h-11 !px-4 tabular-nums"
              >
                {SITE.phone}
              </a>
            </div>
          </header>

          <div className="h-[520vh]">
            <div className="sticky top-0 flex min-h-[100svh] items-end pb-28 pt-24 md:items-center md:pb-16">
              <div className="wrap grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <article key={chapter.id} className="chapter is-active max-w-xl">
                  <p className="label mb-4 tabular-nums">
                    {chapter.label} / {chapter.title}
                  </p>
                  {storyIdx === 0 ? (
                    <h1 className="max-w-[14ch] text-balance text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
                      {chapter.title}{" "}
                      <em className="font-serif font-normal italic text-accent">
                        {chapter.accent}
                      </em>
                    </h1>
                  ) : (
                    <h2 className="max-w-[14ch] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                      {chapter.title}{" "}
                      <em className="font-serif font-normal italic text-accent">
                        {chapter.accent}
                      </em>
                    </h2>
                  )}
                  <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/80 md:text-lg">
                    {chapter.body}
                  </p>
                  {storyIdx === 0 ? (
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a href="#kontakt" className="btn btn-primary w-full sm:w-auto">
                        Nezávazná poptávka
                      </a>
                      <a
                        href={SITE.phoneHref}
                        className="btn btn-ghost w-full tabular-nums sm:w-auto"
                      >
                        Zavolat: {SITE.phone}
                      </a>
                    </div>
                  ) : null}
                </article>

                <aside
                  className={`justify-self-start transition-opacity duration-300 lg:justify-self-end ${
                    showDims ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={!showDims}
                >
                  <ul className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
                    {DIMS.map((d) => (
                      <li
                        key={d.id}
                        className="flex items-baseline justify-between gap-8 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-sm text-muted">{d.label}</span>
                        <span className="tabular-nums text-sm font-semibold text-accent">
                          {d.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>

          <ContactOutro />
        </div>

        {progress < 0.88 ? (
          <HoldControl hold={hold} onHoldChange={onHoldChange} />
        ) : null}
        <FloatingBadge />
      </main>
    </>
  );
}
