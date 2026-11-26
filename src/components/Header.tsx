import { useEffect, useState } from "react";
import { NAV, SITE } from "../data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#121212]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <a href="#top" className="min-h-11 min-w-11 font-semibold tracking-tight">
          {SITE.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hlavní navigace">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink/75 transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a href={SITE.phoneHref} className="btn btn-ghost !min-h-11 !px-4 tabular-nums">
            {SITE.phone}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Zavřít" : "Menu"}</span>
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

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#121212] md:hidden"
        >
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
              className="btn btn-primary mt-3 w-full tabular-nums"
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
