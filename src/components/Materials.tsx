import { useState } from 'react'
import { MATERIALS } from '../data'

function KitchenDrawing() {
  return (
    <svg
      viewBox="0 0 520 360"
      className="h-auto w-full"
      role="img"
      aria-label="Kótovaný náčrt kuchyňské sestavy s rozměry 2850 mm a 600 mm"
    >
      <rect x="0.5" y="0.5" width="519" height="359" fill="#F2EDE4" stroke="#D6CEC0" />
      {/* Diagonal construction line */}
      <line x1="40" y1="320" x2="480" y2="40" stroke="#D6CEC0" strokeWidth="1" strokeDasharray="4 6" />
      {/* Base cabinets */}
      <rect x="70" y="160" width="280" height="110" fill="none" stroke="#141312" strokeWidth="1.5" />
      <line x1="140" y1="160" x2="140" y2="270" stroke="#141312" strokeWidth="1" />
      <line x1="210" y1="160" x2="210" y2="270" stroke="#141312" strokeWidth="1" />
      <line x1="280" y1="160" x2="280" y2="270" stroke="#141312" strokeWidth="1" />
      {/* Tall cabinet */}
      <rect x="350" y="70" width="90" height="200" fill="none" stroke="#141312" strokeWidth="1.5" />
      <line x1="350" y1="140" x2="440" y2="140" stroke="#141312" strokeWidth="1" />
      <line x1="350" y1="210" x2="440" y2="210" stroke="#141312" strokeWidth="1" />
      {/* Counter depth dim */}
      <line x1="70" y1="290" x2="350" y2="290" stroke="#C8823B" strokeWidth="1" />
      <line x1="70" y1="285" x2="70" y2="295" stroke="#C8823B" strokeWidth="1" />
      <line x1="350" y1="285" x2="350" y2="295" stroke="#C8823B" strokeWidth="1" />
      <text x="210" y="308" textAnchor="middle" fill="#C8823B" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
        2850 mm
      </text>
      {/* Depth dim */}
      <line x1="50" y1="160" x2="50" y2="270" stroke="#C8823B" strokeWidth="1" />
      <line x1="45" y1="160" x2="55" y2="160" stroke="#C8823B" strokeWidth="1" />
      <line x1="45" y1="270" x2="55" y2="270" stroke="#C8823B" strokeWidth="1" />
      <text
        x="28"
        y="220"
        textAnchor="middle"
        fill="#C8823B"
        fontSize="11"
        fontFamily="Plus Jakarta Sans, sans-serif"
        transform="rotate(-90 28 220)"
      >
        600 mm
      </text>
      {/* Labels */}
      <text x="210" y="148" textAnchor="middle" fill="#5F5A52" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Blum Tandembox
      </text>
      <text x="395" y="55" textAnchor="middle" fill="#5F5A52" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Vysoká skříň
      </text>
      <text x="70" y="340" fill="#5F5A52" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Ergonomie: pracovní výška 900 mm · úchopová hrana
      </text>
    </svg>
  )
}

export function Materials() {
  const [activeId, setActiveId] = useState<string>(MATERIALS[0].id)
  const active = MATERIALS.find((m) => m.id === activeId) ?? MATERIALS[0]

  return (
    <section id="materialy" className="bg-paper text-ink" aria-labelledby="materialy-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <header className="mb-10 border-b border-line-paper pb-8 md:mb-12">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-light">
            02 / Architektura & materiály
          </p>
          <h2
            id="materialy-heading"
            className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl"
          >
            Výkres sestavy a vzorník povrchů
          </h2>
        </header>

        <div className="grid gap-0 border border-line-paper lg:grid-cols-2">
          <div className="border-b border-line-paper p-5 md:p-8 lg:border-b-0 lg:border-r">
            <p className="mb-4 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">
              Kótovaný náčrt · kuchyně
            </p>
            <KitchenDrawing />
          </div>

          <div className="p-5 md:p-8">
            <p className="mb-4 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">
              Vzorník dřevin a povrchů
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Materiály">
              {MATERIALS.map((m) => {
                const selected = m.id === activeId
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(m.id)}
                    className={`flex flex-col overflow-hidden rounded-sm border text-left transition-[border-color,transform] duration-150 ease-out-strong active:scale-[0.98] ${
                      selected ? 'border-accent' : 'border-line-paper hover:border-ink/30'
                    }`}
                  >
                    <span
                      className="aspect-square w-full"
                      style={{ backgroundColor: m.tone }}
                      aria-hidden
                    />
                    <span className="min-h-11 px-2 py-2 text-[0.65rem] leading-snug text-muted-light">
                      <span className="tabular-nums text-accent">{m.code}</span>
                      <span className="mt-0.5 block text-ink">{m.name}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <article
              role="tabpanel"
              className="mt-6 border-t border-line-paper pt-5"
              aria-live="polite"
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-1 h-12 w-12 shrink-0 rounded-sm border border-line-paper"
                  style={{ backgroundColor: active.tone }}
                  aria-hidden
                />
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    <span className="tabular-nums text-accent">{active.code}</span>
                    <span className="mx-2 text-line-paper">/</span>
                    {active.name}
                  </h3>
                  <p className="mt-3 max-w-prose text-sm text-muted-light">{active.props}</p>
                </div>
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between gap-4 border-b border-line-paper pb-2">
                  <dt className="text-muted-light">Odolnost</dt>
                  <dd className="max-w-[16rem] text-right">{active.durability}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line-paper pb-2">
                  <dt className="text-muted-light">Doporučené použití</dt>
                  <dd className="max-w-[16rem] text-right">{active.use}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-light">Cenová hladina</dt>
                  <dd className="text-right font-medium">{active.tier}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
