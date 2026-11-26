import { useEffect, useState } from "react";
import { NAV, SITE } from "../data";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[#F5F2EC]/90 backdrop-blur-md">
      <div className="wrap grid h-16 grid-cols-[1fr_auto] items-center gap-3 md:h-[4.25rem] md:grid-cols-[1fr_auto_1fr]">
        <a href="#top" className="min-h-11 text-sm font-bold tracking-tight">
          TRUHLAŘSTVÍ DVOŘÁK
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Hlavní navigace">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink/75 transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <a
            href={SITE.phoneHref}
            className="btn btn-dark hidden !min-h-11 !px-4 tabular-nums sm:inline-flex"
          >
            Zavolat: {SITE.phone}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="flex w-5 flex-col gap-1.5">
              <span
                className={`block h-px bg-ink transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px bg-ink transition-opacity duration-150 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px bg-ink transition-transform duration-200 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-bg md:hidden">
          <nav className="wrap flex flex-col gap-1 py-4" aria-label="Mobilní navigace">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-base"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={SITE.phoneHref}
              className="btn btn-dark mt-3 w-full tabular-nums"
              onClick={() => setOpen(false)}
            >
              Zavolat: {SITE.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
