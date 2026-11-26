import { HERO_PHOTO, SITE } from '../data'

export function Hero() {
  return (
    <section
      id="top"
      className="showroom-glow relative min-h-[100svh] overflow-hidden pt-16 md:pt-[4.25rem]"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-6xl flex-col justify-end px-5 pb-12 md:px-8 md:pb-16 lg:justify-center">
        {/* Layered display type + photo */}
        <div className="relative mb-10 md:mb-14">
          <p
            id="hero-heading"
            className="pointer-events-none select-none font-display text-[18vw] font-semibold leading-[0.85] tracking-[-0.04em] text-ink-soft/90 md:text-[9.5vw] lg:text-[7.5rem]"
            aria-hidden
          >
            DVOŘÁK
          </p>

          <div className="relative z-10 mx-auto -mt-[6vw] aspect-[16/10] w-[88%] max-w-3xl overflow-hidden rounded-sm border border-white/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] md:-mt-16 md:w-[70%]">
            <img
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <p
            className="pointer-events-none relative z-20 -mt-[5vw] select-none text-right font-display text-[12vw] font-semibold leading-[0.85] tracking-[-0.03em] text-accent/90 md:-mt-12 md:text-[6.5vw] lg:text-[5.5rem]"
            aria-hidden
          >
            MASIV NA MÍRU
          </p>

          <h1 className="sr-only">
            Truhlářství Dvořák — masiv na míru. Poctivý nábytek z brněnské dílny.
          </h1>
        </div>

        <div className="hero-enter grid max-w-6xl gap-8 md:grid-cols-[1.2fr_auto] md:items-end">
          <div>
            <p className="max-w-md text-base leading-relaxed text-muted-dark md:text-lg">
              Poctivý nábytek z brněnské dílny.{' '}
              <em className="font-serif italic text-accent">Navržený na generace.</em>
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-dark">
              <span className="tabular-nums font-semibold text-ink-soft">
                {SITE.rating}&nbsp;★
              </span>
              <span className="h-3 w-px bg-white/15" aria-hidden />
              <span>
                Google ({SITE.reviews} recenzí)
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#konfigurator"
              className="btn-lift inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-5 text-sm font-medium text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-[#d4924a] active:scale-[0.98]"
            >
              Sestavit orientační cenu
            </a>
            <a
              href={SITE.phoneHref}
              className="btn-lift inline-flex min-h-11 items-center justify-center rounded-sm border border-white/15 bg-white/5 px-5 text-sm font-medium text-ink-soft transition-[transform,background-color,border-color] duration-150 ease-out-strong hover:border-accent/50 hover:bg-white/10 active:scale-[0.98]"
            >
              Zavolat: <span className="ml-1.5 tabular-nums">{SITE.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
