import { useEffect, useRef } from "react";
import type { LabelProjection } from "../three/HardwareEngine";

type Props = {
  hold: number;
  blueprint: boolean;
  labels: LabelProjection[];
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
      if (holding.current) onHoldChange(Math.min(1, value.current + 0.04));
      else if (value.current > 0) onHoldChange(Math.max(0, value.current - 0.055));
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
            <span
              key={l.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 bg-black/55 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-ink backdrop-blur-sm"
              style={{ left: l.x, top: l.y }}
            >
              {l.label}
            </span>
          ))}
      </div>

      <div className="pointer-events-auto fixed bottom-24 left-4 z-40 flex max-w-[14rem] flex-col gap-2 md:bottom-8">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-black/50 px-3 text-xs backdrop-blur-md">
          <input
            type="checkbox"
            className="accent-[#D4A359]"
            checked={blueprint}
            onChange={(e) => onBlueprintChange(e.target.checked)}
          />
          Technický výkres
        </label>

        <button
          type="button"
          className="hold-ring flex h-14 w-14 items-center justify-center rounded-full p-[3px] touch-none select-none active:scale-[0.97]"
          style={{
            background: `conic-gradient(#D4A359 ${hold * 100}%, rgba(245,242,235,0.12) 0)`,
          }}
          aria-label="Podržet pro rozklad kování"
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
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0B0A09] text-[0.6rem] font-semibold uppercase tracking-[0.12em]">
            Hold
          </span>
        </button>
        <p className="rounded-full border border-line bg-black/45 px-3 py-1.5 text-xs text-ink/85 backdrop-blur-md">
          Podržet pro rozklad
        </p>
      </div>
    </>
  );
}
