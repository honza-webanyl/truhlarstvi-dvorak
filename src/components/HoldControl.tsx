import { useEffect, useRef } from "react";

type Props = {
  hold: number;
  onHoldChange: (v: number) => void;
};

export function HoldControl({ hold, onHoldChange }: Props) {
  const holding = useRef(false);
  const value = useRef(hold);
  value.current = hold;

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (holding.current) {
        onHoldChange(Math.min(1, value.current + 0.035));
      } else if (value.current > 0) {
        onHoldChange(Math.max(0, value.current - 0.05));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onHoldChange]);

  return (
    <div className="pointer-events-auto fixed bottom-24 left-1/2 z-40 flex w-[min(92vw,20rem)] -translate-x-1/2 flex-col items-center gap-2 md:bottom-10">
      <button
        type="button"
        className="hold-ring relative flex h-16 w-16 items-center justify-center rounded-full p-[3px] touch-none select-none active:scale-[0.97]"
        style={{ ["--p" as string]: String(hold * 100) }}
        aria-label="Podržet pro rozklad stolu"
        onPointerDown={(e) => {
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          holding.current = true;
        }}
        onPointerUp={() => {
          holding.current = false;
        }}
        onPointerCancel={() => {
          holding.current = false;
        }}
        onLostPointerCapture={() => {
          holding.current = false;
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0B0A09] text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink">
          Hold
        </span>
      </button>
      <p className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-center text-xs text-ink/85 backdrop-blur-md">
        Podržet pro rozklad
      </p>
    </div>
  );
}
