import { useState } from 'react'
import { PROCESS } from '../data'

export function Process() {
  const [step, setStep] = useState(0)
  const current = PROCESS[step]

  return (
    <section id="proces" className="showroom-glow border-t border-white/10" aria-labelledby="proces-heading">
      <div className="mx-auto grid min-h-[70vh] max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_auto] md:px-8 md:py-24 lg:min-h-[80vh]">
        <div className="flex flex-col justify-end">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-dark">
            03 / Proces výroby
          </p>
          <h2 id="proces-heading" className="sr-only">
            Proces výroby od zaměření po montáž
          </h2>

          <div className="mt-8" aria-live="polite">
            <p className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink-soft md:text-5xl lg:text-6xl">
              <span className="tabular-nums text-accent">{current.n}</span>
              <span className="mx-3 text-white/20">/</span>
              <span className="uppercase tracking-wide">{current.title}</span>
            </p>
            <p className="mt-4 font-serif text-2xl italic text-accent md:text-3xl">
              {current.italic}
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-dark md:text-lg">
              {current.body}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Fáze výroby">
            {PROCESS.map((p, i) => (
              <button
                key={p.n}
                type="button"
                role="tab"
                aria-selected={i === step}
                onClick={() => setStep(i)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-xs transition-[background-color,border-color,color] duration-150 ease-out-strong active:scale-[0.98] ${
                  i === step
                    ? 'border-accent bg-accent/15 text-accent'
                    : 'border-white/15 text-muted-dark hover:border-white/30 hover:text-ink-soft'
                }`}
              >
                {p.pill}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical step indicator */}
        <aside className="hidden md:sticky md:top-28 md:flex md:h-fit md:flex-col md:items-center md:gap-0" aria-hidden>
          {PROCESS.map((p, i) => (
            <button
              key={p.n}
              type="button"
              onClick={() => setStep(i)}
              className="group flex flex-col items-center"
              aria-label={`Krok ${p.n}`}
            >
              <span
                className={`tabular-nums text-sm font-semibold transition-colors duration-150 ${
                  i === step ? 'text-accent' : 'text-muted-dark group-hover:text-ink-soft'
                }`}
              >
                {p.n}
              </span>
              {i < PROCESS.length - 1 ? (
                <span
                  className={`my-2 h-16 w-px transition-colors duration-200 ease-out-strong ${
                    i < step ? 'bg-accent' : i === step ? 'bg-gradient-to-b from-accent to-white/15' : 'bg-white/15'
                  }`}
                />
              ) : null}
            </button>
          ))}
        </aside>
      </div>
    </section>
  )
}
