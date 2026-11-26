import { SITE } from '../data'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-showroom text-ink-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8 md:py-14">
        <div>
          <p className="font-display text-base font-semibold">{SITE.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-dark">
            Zakázkové kuchyně, vestavěné skříně a nábytek z masivu — Brno a okolí.
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-3 inline-flex min-h-11 items-center tabular-nums text-sm font-medium text-ink-soft/90 transition-colors hover:text-accent"
          >
            {SITE.phone}
          </a>
        </div>
        <div className="text-sm text-muted-dark">
          <p>Ukázkový koncept webu · Vytvořil Honza | Webanyl</p>
          <p className="mt-2 text-xs text-muted-dark/70">
            Fotografie: Unsplash (stand-in za klientské realizace)
          </p>
        </div>
      </div>
    </footer>
  )
}
