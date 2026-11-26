import { HERO_IMAGE, SITE } from "../data";

export function Hero() {
  return (
    <section
      id="top"
      className="border-b border-line pb-16 pt-10 md:pb-24 md:pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="label mb-5">Brno-jih • Zakázková výroba od roku 2012</p>
          <h1
            id="hero-heading"
            className="max-w-[16ch] text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-6xl"
          >
            Poctivý nábytek, který{" "}
            <em className="font-serif font-normal italic text-accent">
              vydrží generace.
            </em>
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-muted md:text-lg">
            Navrhujeme a vyrábíme kuchyně na míru, vestavěné skříně, masivní stoly i
            koupelnový nábytek z výběrového dubu a jasanu. Od zaměření v Brně až po
            čistou montáž u vás doma.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#kontakt" className="btn btn-dark w-full sm:w-auto">
              Nezávazná poptávka
            </a>
            <a href="#realizace" className="btn btn-outline w-full sm:w-auto">
              Prohlédnout realizace
            </a>
          </div>

          <p className="mt-6 text-sm text-muted">
            <span className="tabular-nums font-semibold text-ink">
              {SITE.rating} ★
            </span>{" "}
            Google ({SITE.reviews} recenzí) • Zaměření a 3D návrh zdarma
          </p>
        </div>

        <figure>
          <div className="photo aspect-[4/3]">
            <img
              src={HERO_IMAGE}
              alt="Moderní světlá dubová kuchyně — realizace Truhlářství Dvořák"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            01 / Kuchyně z masivního dubu • Realizace Brno-Komín
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
