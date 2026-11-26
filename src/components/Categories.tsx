import { useState } from "react";
import { CATEGORIES, type Category } from "../data";

export function Categories() {
  const [active, setActive] = useState<Category>(CATEGORIES[0]);

  return (
    <section
      id="nabytek"
      className="border-b border-line py-20 md:py-28"
      aria-labelledby="categories-heading"
    >
      <div className="wrap">
        <p className="label mb-4">01 / Nábytek</p>
        <h2
          id="categories-heading"
          className="max-w-[18ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Čtyři druhy zakázkové výroby
        </h2>

        <div
          className="mt-10 flex flex-wrap border-y border-line"
          role="tablist"
          aria-label="Kategorie nábytku"
        >
          {CATEGORIES.map((cat, i) => {
            const on = cat.id === active.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`min-h-12 flex-1 border-line px-3 py-3 text-left text-sm font-medium transition-colors duration-150 ${
                  i > 0 ? "border-l" : ""
                } ${on ? "bg-surface text-ink" : "text-muted hover:text-ink"}`}
                onClick={() => setActive(cat)}
              >
                {cat.tab}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="photo aspect-[4/3]">
            <img
              key={active.image}
              src={active.image}
              alt={active.imageAlt}
              width={1600}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center border border-line bg-surface p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">{active.title}</h3>
              <span className="tabular-nums text-base font-semibold text-accent">
                {active.price}
              </span>
            </div>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
              {active.lead}
            </p>
            <p className="mt-3 text-sm text-ink/80">{active.materials}</p>
            <p className="mt-2 text-sm tabular-nums text-muted">{active.leadTime}</p>
            <a href="#kontakt" className="btn btn-dark mt-8 w-full sm:w-auto">
              Poptat tento nábytek
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
