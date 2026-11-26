import { HERO_IMAGE, SITE } from "../data";

type Props = { reveal: boolean };

export function Hero({ reveal }: Props) {
  return (
    <section
      id="top"
      className="border-b border-line pb-16 pt-10 md:pb-24 md:pt-16"
      aria-labelledby="hero-heading"
    >
      <div
        className={`wrap grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 ${reveal ? "reveal is-on" : "reveal"}`}
      >
        <div>
          <p className="label mb-5">Brno-jih • Zakázková výroba od roku 2012</p>
          <h1
            id="hero-heading"
            className="max-w-[16ch] text-balance text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          >
            Zakázkový nábytek, který{" "}
            <em className="font-serif font-normal italic text-accent">
              vydrží generace.
            </em>
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/80 md:text-lg">
            Kuchyně, vestavěné skříně a masiv z brněnské dílny. Zaměření a 3D návrh
            zdarma při realizaci v {SITE.region}.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-black/30 px-3.5 py-2 text-sm">
            <span className="tabular-nums font-semibold text-accent">
              {SITE.rating} ★
            </span>
            <span className="text-ink/70">Google</span>
            <span className="text-ink/35" aria-hidden>
              ·
            </span>
            <span className="tabular-nums text-ink/70">
              {SITE.reviews} recenzí
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#kontakt" className="btn btn-primary w-full sm:w-auto">
              Nezávazná poptávka
            </a>
            <a href="#nabytek" className="btn btn-ghost w-full sm:w-auto">
              Prohlédnout nábytek
            </a>
          </div>
        </div>

        <figure>
          <div className="spot-frame aspect-[4/3]">
            <img
              src={HERO_IMAGE}
              alt="Moderní dubová kuchyně — realizace Truhlářství Dvořák"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            01 — Dubová kuchyně na míru • Realizace Brno-Komín
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
