
import { useEffect, useRef } from "react";
import type { LabelState } from "../three/PrecisionEngine";
import { unlockAudio } from "../three/audio";

type Props = {
  hold: number;
  blueprint: boolean;
  labels: LabelState[];
  onHoldChange: (v: number) => void;
  onBlueprintChange: (v: boolean) => void;
  visible: boolean;
};

export function HardwareHUD({
  hold,
  blueprint,
  labels,
  onHoldChange,
  onBlueprintChange,
  visible,
}: Props) {
  const holding = useRef(false);
  const value = useRef(hold);
  value.current = hold;

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (holding.current) onHoldChange(Math.min(1, value.current + 0.035));
      else if (value.current > 0) onHoldChange(Math.max(0, value.current - 0.05));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onHoldChange]);

  if (!visible) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-20">
        {labels
          .filter((l) => l.visible)
          .map((l) => (
            <div
              key={l.id}
              className="absolute flex items-center gap-2"
              style={{
                left: l.side === "left" ? Math.max(16, l.x - 180) : Math.min(window.innerWidth - 200, l.x + 12),
                top: l.y,
                transform: "translateY(-50%)",
              }}
            >
              {l.side === "right" ? (
                <span className="h-px w-8 bg-accent/70" aria-hidden />
              ) : null}
              <span className="rounded-full border border-accent/40 bg-black/55 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-ink backdrop-blur-sm">
                {l.label}
              </span>
              {l.side === "left" ? (
                <span className="h-px w-8 bg-accent/70" aria-hidden />
              ) : null}
            </div>
          ))}
      </div>

      <div className="pointer-events-auto fixed bottom-24 left-4 z-40 flex max-w-[14rem] flex-col gap-2 md:bottom-8">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-black/50 px-3 text-xs backdrop-blur-md">
          <input
            type="checkbox"
            className="accent-[#C9A36A]"
            checked={blueprint}
            onChange={(e) => onBlueprintChange(e.target.checked)}
          />
          Technický výkres
        </label>

        <button
          type="button"
          className="flex h-14 w-14 items-center justify-center rounded-full p-[3px] touch-none select-none active:scale-[0.97]"
          style={{
            background: `conic-gradient(#C9A36A ${hold * 100}%, rgba(244,241,234,0.12) 0)`,
          }}
          aria-label="Podržet pro rozklad"
          onPointerDown={(e) => {
            e.preventDefault();
            unlockAudio();
            e.currentTarget.setPointerCapture(e.pointerId);
            holding.current = true;
          }}
          onPointerUp={() => {
            holding.current = false;
          }}
          onPointerCancel={() => {
            holding.current = false;
          }}
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#080809] text-[0.65rem] font-semibold tracking-wide">
            HOLD
          </span>
        </button>
        <p className="text-[0.65rem] text-muted">Podržet pro rozklad</p>
      </div>
    </>
  );
}
