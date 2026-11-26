
import { useEffect, useState } from "react";
import { NAV, SITE } from "../data";
import { setMuted, unlockAudio } from "../three/audio";

type Props = { soundOn: boolean; onSoundChange: (v: boolean) => void };

export function Nav({ soundOn, onSoundChange }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[#080809]/80 backdrop-blur-md">
      <div className="wrap grid h-16 grid-cols-[1fr_auto] items-center gap-3 md:h-[4.25rem] md:grid-cols-[1fr_auto_1fr]">
        <a href="#presnost" className="min-h-11 text-sm font-bold tracking-tight">
          TRUHLAŘSTVÍ DVOŘÁK
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Hlavní navigace">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-ink/70 transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn btn-ghost !min-h-11 !px-3 text-xs"
            aria-pressed={soundOn}
            onClick={() => {
              unlockAudio();
              const next = !soundOn;
              setMuted(!next);
              onSoundChange(next);
            }}
          >
            {soundOn ? "Zvuk zapnutý" : "Zvuk vypnutý"}
          </button>
          <a href={SITE.phoneHref} className="btn btn-accent hidden tabular-nums sm:inline-flex">
            Zavolat
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="flex w-5 flex-col gap-1.5">
              <span className={`block h-px bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-bg lg:hidden">
          <nav className="wrap flex flex-col gap-1 py-4" aria-label="Mobilní navigace">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="flex min-h-11 items-center" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href={SITE.phoneHref} className="btn btn-accent mt-3 w-full tabular-nums" onClick={() => setOpen(false)}>
              Zavolat: {SITE.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
