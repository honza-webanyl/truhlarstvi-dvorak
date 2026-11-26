import { HERO_IMAGE, SITE } from "../data";

export function Hero() {
  return (
    <section
      id="top"
      data-enter
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-20 aspect-[3/4] md:aspect-auto">
        <img
          src={HERO_IMAGE}
          alt="Moderní interiér s dubovou kuchyní a denním světlem"
          width={1800}
          height={1200}
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Soft bottom/left gradient only — keeps photo sharp, no fog */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#121212] via-[#121212]/55 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 left-0 -z-10 w-[55%] bg-gradient-to-r from-[#121212]/70 to-transparent"
        aria-hidden
      />

      <div className="wrap relative w-full pb-14 pt-28 md:pb-20 md:pt-32">
        <p className="hero-enter label mb-5 text-ink/80">
          Truhlářství · {SITE.region}
        </p>

        <h1
          id="hero-heading"
          className="hero-enter-delay max-w-[14ch] text-balance text-[clamp(2.75rem,8vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          Kuchyně a nábytek{" "}
          <em className="font-serif font-normal italic text-accent">na míru</em>
        </h1>

        <p className="hero-enter-delay-2 mt-5 max-w-prose text-base leading-relaxed text-ink/85 md:text-lg">
          Zakázková výroba z masivu v brněnské dílně. Zaměření a 3D návrh zdarma
          při realizaci.
        </p>

        <div className="hero-enter-delay-2 mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 py-2 text-sm backdrop-blur-sm">
          <span className="tabular-nums font-semibold text-accent">
            {SITE.rating} ★
          </span>
          <span className="text-ink/70">Google</span>
          <span className="text-ink/40" aria-hidden>
            ·
          </span>
          <span className="tabular-nums text-ink/70">
            {SITE.reviews} recenzí
          </span>
        </div>

        <div className="hero-enter-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#kontakt" className="btn btn-primary w-full sm:w-auto">
            Nezávazná poptávka
          </a>
          <a
            href={SITE.phoneHref}
            className="btn btn-ghost w-full tabular-nums sm:w-auto"
          >
            Zavolat: {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
