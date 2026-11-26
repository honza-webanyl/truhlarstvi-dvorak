import { useMemo, useState, type FormEvent } from 'react'
import { CONFIG, SITE } from '../data'

function formatKc(n: number) {
  return new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 }).format(Math.round(n))
}

export function Configurator() {
  const [typeId, setTypeId] = useState<string>(CONFIG.types[0].id)
  const [woodId, setWoodId] = useState<string>(CONFIG.woods[0].id)
  const [length, setLength] = useState(3.2)
  const [extras, setExtras] = useState<Record<string, boolean>>({
    viz: true,
    led: false,
    blum: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const type = CONFIG.types.find((t) => t.id === typeId) ?? CONFIG.types[0]
  const wood = CONFIG.woods.find((w) => w.id === woodId) ?? CONFIG.woods[0]

  const estimate = useMemo(() => {
    const base = type.basePerM * length * wood.factor
    const extraSum = CONFIG.extras.reduce(
      (sum, e) => sum + (extras[e.id] ? e.amount : 0),
      0,
    )
    const mid = base + extraSum
    return { low: mid * 0.92, high: mid * 1.12, mid }
  }, [type, wood, length, extras])

  function toggleExtra(id: string) {
    setExtras((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const next: Record<string, string> = {}
    if (!name) next.name = 'Napište prosím jméno.'
    if (!phone) next.phone = 'Vyplňte telefon.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <section
      id="konfigurator"
      className="border-t border-white/10 bg-paper text-ink"
      aria-labelledby="konfigurator-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <header className="mb-10 border-b border-line-paper pb-8">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-light">
            04 / Konfigurátor zakázky
          </p>
          <h2
            id="konfigurator-heading"
            className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl"
          >
            Sestavte orientační cenu
          </h2>
          <p className="mt-3 max-w-prose text-muted-light">
            Živý odhad podle typu, materiálu a délky. Finální nabídka vždy po zaměření.
          </p>
        </header>

        <div className="grid gap-0 border border-line-paper lg:grid-cols-2">
          {/* Left: params */}
          <div className="space-y-8 border-b border-line-paper p-6 md:p-8 lg:border-b-0 lg:border-r">
            <fieldset>
              <legend className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">
                Typ nábytku
              </legend>
              <div className="mt-3 flex flex-col gap-2">
                {CONFIG.types.map((t) => (
                  <label
                    key={t.id}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border px-4 transition-colors ${
                      typeId === t.id ? 'border-accent bg-accent/10' : 'border-line-paper hover:border-ink/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={t.id}
                      checked={typeId === t.id}
                      onChange={() => setTypeId(t.id)}
                      className="accent-accent"
                    />
                    <span className="text-sm font-medium">{t.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">
                Zvolený materiál
              </legend>
              <div className="mt-3 flex flex-col gap-2">
                {CONFIG.woods.map((w) => (
                  <label
                    key={w.id}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border px-4 transition-colors ${
                      woodId === w.id ? 'border-accent bg-accent/10' : 'border-line-paper hover:border-ink/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="wood"
                      value={w.id}
                      checked={woodId === w.id}
                      onChange={() => setWoodId(w.id)}
                      className="accent-accent"
                    />
                    <span className="text-sm font-medium">{w.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="length" className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">
                Přibližná délka / rozsah
              </label>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="tabular-nums text-muted-light">1,5 m</span>
                <span className="tabular-nums font-semibold text-accent">{length.toFixed(1).replace('.', ',')} m</span>
                <span className="tabular-nums text-muted-light">6,0 m</span>
              </div>
              <input
                id="length"
                type="range"
                min={1.5}
                max={6}
                step={0.1}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </div>

            <fieldset>
              <legend className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">
                Doplňky
              </legend>
              <div className="mt-3 space-y-2">
                {CONFIG.extras.map((ex) => (
                  <label
                    key={ex.id}
                    className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-sm border border-line-paper px-4 hover:border-ink/25"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(extras[ex.id])}
                        onChange={() => toggleExtra(ex.id)}
                        className="size-4 accent-accent"
                      />
                      {ex.label}
                    </span>
                    <span className="tabular-nums text-xs text-muted-light">
                      {ex.amount === 0 ? 'zdarma při realizaci' : `+ ${formatKc(ex.amount)} Kč`}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Right: live card + form */}
          <div className="bg-[#ebe4d8] p-6 md:p-8">
            <div className="rounded-sm border border-line-paper bg-paper p-5 md:p-6">
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">
                Specifikace zakázky
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-line-paper pb-2">
                  <dt className="text-muted-light">Typ</dt>
                  <dd className="text-right font-medium">{type.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line-paper pb-2">
                  <dt className="text-muted-light">Materiál</dt>
                  <dd className="text-right font-medium">{wood.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line-paper pb-2">
                  <dt className="text-muted-light">Rozměr</dt>
                  <dd className="tabular-nums text-right font-medium">
                    {length.toFixed(1).replace('.', ',')} m
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line-paper pb-2">
                  <dt className="text-muted-light">Dodání</dt>
                  <dd className="tabular-nums text-right font-medium">{type.lead}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted-light">Orientační rozpětí</dt>
                  <dd
                    data-testid="price-estimate"
                    className="mt-1 font-display text-2xl font-semibold tabular-nums tracking-tight text-ink md:text-3xl"
                  >
                    {formatKc(estimate.low)} – {formatKc(estimate.high)}&nbsp;Kč
                  </dd>
                </div>
              </dl>
            </div>

            <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
              <div>
                <label htmlFor="cfg-name" className="block text-sm font-medium">
                  Jméno
                </label>
                <input
                  id="cfg-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="mt-2 min-h-12 w-full rounded-sm border border-line-paper bg-paper px-4 text-ink placeholder:text-muted-light/70 focus:border-accent"
                  placeholder="Jan Novák…"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'cfg-err-name' : undefined}
                />
                {errors.name ? (
                  <p id="cfg-err-name" className="mt-1.5 text-sm text-accent">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="cfg-phone" className="block text-sm font-medium">
                  Telefon
                </label>
                <input
                  id="cfg-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="mt-2 min-h-12 w-full rounded-sm border border-line-paper bg-paper px-4 text-ink placeholder:text-muted-light/70 focus:border-accent"
                  placeholder="+420 774 …"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'cfg-err-phone' : undefined}
                />
                {errors.phone ? (
                  <p id="cfg-err-phone" className="mt-1.5 text-sm text-accent">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-ink px-5 text-sm font-medium text-paper transition-[transform,background-color] duration-150 ease-out-strong hover:bg-accent hover:text-ink active:scale-[0.98] sm:w-auto"
              >
                Odeslat nezávaznou poptávku
              </button>
              <div aria-live="polite">
                {sent ? (
                  <p className="text-sm text-muted-light" role="status">
                    Díky. V ukázkovém konceptu se poptávka neodesílá na server — v ostré verzi by
                    dorazila e-mailem na {SITE.email}.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-10 grid gap-0 border border-line-paper sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Telefon',
              node: (
                <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center tabular-nums font-semibold text-ink hover:text-accent">
                  {SITE.phone}
                </a>
              ),
            },
            {
              label: 'E-mail',
              node: (
                <a href={SITE.emailHref} className="inline-flex min-h-11 items-center break-all text-sm font-medium hover:text-accent">
                  {SITE.email}
                </a>
              ),
            },
            {
              label: 'Otevírací doba',
              node: (
                <p className="py-2 text-sm">
                  <span className="tabular-nums font-medium">{SITE.hours}</span>
                  <span className="mt-1 block text-muted-light">{SITE.hoursNote}</span>
                </p>
              ),
            },
            {
              label: 'Dílna',
              node: (
                <a
                  href={SITE.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-sm font-medium hover:text-accent"
                >
                  {SITE.address}
                </a>
              ),
            },
          ].map((row) => (
            <div key={row.label} className="border-b border-line-paper px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-light">{row.label}</p>
              <div className="mt-1">{row.node}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
