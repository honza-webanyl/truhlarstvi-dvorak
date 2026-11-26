import { useEffect, useId, useState } from "react";
import { CATEGORIES, GALLERY, type Category } from "../data";

type Props = { reveal: boolean };

export function Showroom({ reveal }: Props) {
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const [lightbox, setLightbox] = useState<(typeof GALLERY)[number] | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <>
      <section id="nabytek" className="border-b border-line py-20 md:py-28" aria-labelledby="showroom-heading">
        <div className={`wrap ${reveal ? "reveal is-on" : "reveal"}`}>
          <p className="label mb-4">01 / Nábytek</p>
          <h2 id="showroom-heading" className="max-w-[18ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Interaktivní showroom <em className="font-serif font-normal italic text-accent">čtyř kategorií</em>
          </h2>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Kategorie nábytku">
            {CATEGORIES.map((cat) => {
              const on = cat.id === active.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-[background-color,border-color,color] duration-200 ${
                    on ? "border-accent/50 bg-accent/15 text-ink" : "border-line text-ink/70 hover:text-ink"
                  }`}
                  onClick={() => setActive(cat)}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="spot-frame aspect-[4/3]">
              <img key={active.image} src={active.image} alt={active.imageAlt} width={1600} height={1200} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-5 border border-line p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight">{active.title}</h3>
                <span className="rounded-full border border-accent/40 px-3 py-1 text-sm font-semibold tabular-nums text-accent">{active.price}</span>
              </div>
              <p className="max-w-prose text-base leading-relaxed text-ink/80">{active.lead}</p>
              <p className="text-sm text-muted">{active.leadTime}</p>
              <ul className="flex flex-wrap gap-2">
                {active.specs.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">{s}</li>
                ))}
              </ul>
              <a href="#kontakt" className="btn btn-primary mt-2">Nezávazná poptávka</a>
            </div>
          </div>
        </div>
      </section>
      <section id="realizace" className="border-b border-line py-20 md:py-28" aria-labelledby="gallery-heading">
        <div className={`wrap ${reveal ? "reveal is-on" : "reveal"}`}>
          <p className="label mb-4">Realizace</p>
          <h2 id="gallery-heading" className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-4xl">Architektonická galerie</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {GALLERY.map((item) => (
              <li key={item.id}>
                <button type="button" className="spot-frame w-full cursor-pointer text-left" onClick={() => setLightbox(item)}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.alt} width={1400} height={1050} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs text-muted">{item.place}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {lightbox ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="presentation" onClick={() => setLightbox(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="max-h-[90svh] w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-bg" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3]">
              <img src={lightbox.image} alt={lightbox.alt} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <p id={titleId} className="text-sm font-medium">{lightbox.title} · {lightbox.place}</p>
              <button type="button" className="btn btn-ghost" onClick={() => setLightbox(null)}>Zavřít</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
