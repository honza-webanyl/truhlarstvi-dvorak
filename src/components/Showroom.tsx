import { useCallback, useEffect, useState } from 'react'
import { SHOWROOM } from '../data'

export function Showroom() {
  const [active, setActive] = useState<(typeof SHOWROOM)[number] | null>(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  return (
    <section id="showroom" className="showroom-glow border-t border-white/10" aria-labelledby="showroom-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-dark">
            01 / Showroom realizací
          </p>
          <h2
            id="showroom-heading"
            className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-0.02em] text-ink-soft md:text-4xl"
          >
            Výklenky hotových zakázek
          </h2>
          <p className="mt-3 max-w-prose text-muted-dark">
            Najetím rozsvítíte bodové světlo. Kliknutím otevřete technickou specifikaci a orientační
            cenu.
          </p>
        </header>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2">
          {SHOWROOM.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="spotlight-niche group flex w-full flex-col overflow-hidden rounded-sm border border-white/10 bg-black/40 text-left transition-[border-color] duration-200 ease-out-strong hover:border-accent/40 focus-visible:border-accent"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={700}
                    height={933}
                    loading="lazy"
                    decoding="async"
                    className="niche-photo h-full w-full object-cover transition-transform duration-300 ease-out-strong"
                  />
                </div>
                <div className="relative z-10 border-t border-white/10 px-3 py-3">
                  <p className="text-sm font-semibold text-ink-soft">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-dark">{item.place}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="showroom-detail-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 md:items-center md:p-6"
          onClick={close}
        >
          <div
            className="grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-t-sm border border-white/10 bg-showroom md:grid-cols-2 md:rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] md:aspect-auto md:min-h-[28rem]">
              <img
                src={active.src.replace('w=1400', 'w=1800')}
                alt={active.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between overflow-y-auto p-6 md:p-8">
              <div>
                <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-dark">
                  {active.place}
                </p>
                <h3 id="showroom-detail-title" className="mt-2 font-display text-2xl font-semibold text-ink-soft md:text-3xl">
                  {active.title}
                </h3>
                <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <dt className="text-muted-dark">Materiál</dt>
                    <dd className="text-right text-ink-soft">{active.material}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <dt className="text-muted-dark">Kování</dt>
                    <dd className="text-right text-ink-soft">{active.hardware}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <dt className="text-muted-dark">Rozměry</dt>
                    <dd className="tabular-nums text-right text-ink-soft">{active.size}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <dt className="text-muted-dark">Výroba</dt>
                    <dd className="tabular-nums text-right text-ink-soft">{active.lead}</dd>
                  </div>
                  <div className="flex justify-between gap-4 pt-1">
                    <dt className="text-muted-dark">Orientační cena</dt>
                    <dd className="tabular-nums text-right text-lg font-semibold text-accent">
                      {active.price.includes('od') ? active.price : `${active.price} Kč`}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#konfigurator"
                  onClick={close}
                  className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-5 text-sm font-medium text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-[#d4924a] active:scale-[0.98]"
                >
                  Sestavit podobnou zakázku
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/15 px-5 text-sm text-ink-soft transition-colors hover:border-white/30 active:scale-[0.98]"
                >
                  Zavřít
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
