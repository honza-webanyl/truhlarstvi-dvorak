import { useEffect, useId, useState } from "react";
import { SERVICES, type Service } from "../data";

export function Services() {
  const [active, setActive] = useState<Service | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      id="realizace"
      className="border-t border-line py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="wrap">
        <p className="label mb-4">01 / Realizace</p>
        <h2
          id="services-heading"
          className="max-w-[18ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Co vyrábíme z{" "}
          <em className="font-serif font-normal italic text-accent">masivu</em>
        </h2>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
          Čtyři hlavní zakázky. Rozklikněte kartu — uvidíte detaily, cenu od a
          materiál.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="shelf-card group w-full cursor-pointer text-left"
                onClick={() => setActive(item)}
                aria-haspopup="dialog"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width={1400}
                    height={960}
                    loading="lazy"
                    className="shelf-photo h-full w-full object-cover"
                  />
                </div>
                <div className="relative z-10 space-y-3 p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      {item.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-accent">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-ink/80">
                    Detail realizace
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          role="presentation"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-elev shadow-2xl"
            style={{
              animation: "hero-rise 300ms cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={active.image}
                alt={active.imageAlt}
                width={1400}
                height={875}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-5 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3
                  id={titleId}
                  className="text-2xl font-semibold tracking-tight"
                >
                  {active.title}
                </h3>
                <span className="rounded-full border border-accent/40 px-3 py-1 text-sm font-semibold tabular-nums text-accent">
                  {active.price}
                </span>
              </div>
              <p className="max-w-prose text-base leading-relaxed text-ink/80">
                {active.detail}
              </p>
              <ul className="flex flex-wrap gap-2">
                {active.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href="#kontakt"
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={() => setActive(null)}
                >
                  Nezávazná poptávka
                </a>
                <button
                  type="button"
                  className="btn btn-ghost w-full sm:w-auto"
                  onClick={() => setActive(null)}
                >
                  Zavřít
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
