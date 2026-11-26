
import { useState, type FormEvent } from "react";
import { SERVICES, SITE } from "../data";

type Props = {
  reveals: Record<string, boolean>;
};

export function Sections({ reveals }: Props) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
    form.reset();
  }

  return (
    <>
      <section id="presnost" className="screen" aria-labelledby="hero-heading">
        <div className={`wrap max-w-2xl ${reveals.presnost ? "reveal is-on" : "reveal"}`}>
          <p className="label mb-5">01 / Přesnost</p>
          <h1
            id="hero-heading"
            className="max-w-[14ch] text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
          >
            Zakázkový nábytek s{" "}
            <em className="font-serif font-normal italic text-accent">milimetrovou jistotou.</em>
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/80 md:text-lg">
            Kuchyně, vestavěné skříně a masiv z brněnské dílny. Stejná přesnost, jakou drží
            pokosník na pozadí — od zaměření po montáž.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#poptavka" className="btn btn-accent w-full sm:w-auto">
              Nezávazná poptávka
            </a>
            <a href="#konstrukce" className="btn btn-ghost w-full sm:w-auto">
              Prohlédnout konstrukci
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            <span className="tabular-nums font-semibold text-accent">{SITE.rating} ★</span> Google
            ({SITE.reviews} recenzí) · Brno a okolí
          </p>
        </div>
      </section>

      <section id="detail" className="screen" aria-labelledby="detail-heading">
        <div className={`wrap max-w-xl ${reveals.detail ? "reveal is-on" : "reveal"}`}>
          <p className="label mb-5">02 / Detail</p>
          <h2 id="detail-heading" className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Hrana, kde se láme{" "}
            <em className="font-serif font-normal italic text-accent">světlo.</em>
          </h2>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-muted">
            Kartáčovaná mosaz, broušená ocel a skleněná libela Ø 8 mm. Tolerance 0,05 mm na
            zkosení — stejný standard, který držíme u kuchyňských korpusů a dveří.
          </p>
        </div>
      </section>

      <section id="konstrukce" className="screen" aria-labelledby="build-heading">
        <div className={`wrap max-w-xl ${reveals.konstrukce ? "reveal is-on" : "reveal"}`}>
          <p className="label mb-5">03 / Konstrukce</p>
          <h2 id="build-heading" className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Rozklad na díly.{" "}
            <em className="font-serif font-normal italic text-accent">Bez tajemství.</em>
          </h2>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-muted">
            Podržte tlačítko vlevo dole — pokosník se rozloží. Přepínač Technický výkres ukáže
            živé hrany geometrie. Není to video: každý díl je kód v milimetrech.
          </p>
          <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-ink/85">
            <li className="flex justify-between gap-4 border-b border-line pb-3">
              <span>Ocelové měřítko</span>
              <span className="tabular-nums text-muted">250 × 35 × 2,5 mm</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-line pb-3">
              <span>Mosazná příložka</span>
              <span className="tabular-nums text-muted">140 × 45 × 16 mm</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-line pb-3">
              <span>Skleněná libela</span>
              <span className="tabular-nums text-muted">Ø 8 mm</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Aretační šroub &amp; pružina</span>
              <span className="text-muted">rozklad</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="realizace" className="screen" aria-labelledby="work-heading">
        <div className={`wrap w-full ${reveals.realizace ? "reveal is-on" : "reveal"}`}>
          <p className="label mb-5">04 / Realizace</p>
          <h2 id="work-heading" className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Co vyrábíme v Brně
          </h2>
          <ol className="mt-12 grid gap-0 border border-line md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <li
                key={s.n}
                className={`border-line p-6 md:p-8 ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
              >
                <span className="font-serif text-3xl italic tabular-nums text-accent">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="poptavka" className="screen" aria-labelledby="contact-heading">
        <div className={`wrap grid w-full gap-12 lg:grid-cols-2 ${reveals.poptavka ? "reveal is-on" : "reveal"}`}>
          <div>
            <p className="label mb-5">05 / Poptávka</p>
            <h2 id="contact-heading" className="max-w-[12ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Nezávazná{" "}
              <em className="font-serif font-normal italic text-accent">kalkulace</em>
            </h2>
            <dl className="mt-10 space-y-4 text-sm">
              <div>
                <dt className="label">Telefon</dt>
                <dd className="mt-1">
                  <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center text-lg font-semibold tabular-nums underline-offset-4 hover:underline">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">E-mail</dt>
                <dd className="mt-1">
                  <a href={SITE.emailHref} className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Dílna</dt>
                <dd className="mt-1">
                  <a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                    {SITE.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Otevírací doba</dt>
                <dd className="mt-1 tabular-nums">{SITE.hours}</dd>
              </div>
            </dl>
          </div>

          <form className="border border-line bg-white/[0.03] p-6 md:p-8" onSubmit={onSubmit} noValidate>
            <h3 className="text-xl font-semibold tracking-tight">Nezávazná poptávka</h3>
            <p className="mt-2 text-sm text-muted">Typ nábytku, jméno, telefon a krátká představa.</p>
            {sent ? (
              <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm" role="status">
                Děkujeme. Poptávka je připravená — v ostré verzi ji doručíme na e-mail dílny.
              </p>
            ) : null}
            <div className="mt-6 grid gap-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Typ nábytku</span>
                <select className="field" name="type" defaultValue="" required>
                  <option value="" disabled>Vyberte…</option>
                  <option value="kuchyne">Kuchyně na míru</option>
                  <option value="skrine">Vestavěné skříně</option>
                  <option value="stoly">Masiv a stoly</option>
                  <option value="jine">Jiný nábytek</option>
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Jméno</span>
                <input className="field" name="name" autoComplete="name" required />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Telefon</span>
                <input className="field tabular-nums" name="phone" type="tel" autoComplete="tel" required />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Představa</span>
                <textarea className="field" name="message" rows={4} required placeholder="např. kuchyně 3+kk, Brno-Židenice" />
              </label>
            </div>
            <button type="submit" className="btn btn-accent mt-6 w-full sm:w-auto">
              Odeslat poptávku
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
