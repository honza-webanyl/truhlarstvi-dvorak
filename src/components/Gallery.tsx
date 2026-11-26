import { useEffect, useId, useState } from "react";
import { GALLERY } from "../data";

export function Gallery() {
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
      <section
        id="realizace"
        className="border-b border-line py-20 md:py-28"
        aria-labelledby="gallery-heading"
      >
        <div className="wrap">
          <p className="label mb-4">02 / Realizace</p>
          <h2
            id="gallery-heading"
            className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Vybrané realizace
          </h2>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {GALLERY.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="photo text-left"
                  onClick={() => setLightbox(item)}
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={1400}
                      height={1050}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </button>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold">
                    {item.title} · {item.place}
                  </p>
                  <p className="text-sm text-muted">{item.material}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/70 p-4"
          role="presentation"
          onClick={() => setLightbox(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-bg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3]">
              <img
                src={lightbox.image}
                alt={lightbox.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <p id={titleId} className="text-sm font-medium">
                {lightbox.title} · {lightbox.place} · {lightbox.material}
              </p>
              <button type="button" className="btn btn-outline" onClick={() => setLightbox(null)}>
                Zavřít
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
