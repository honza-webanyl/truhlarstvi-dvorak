import { useState, type FormEvent } from "react";
import { SITE } from "../data";

export function ContactOutro() {
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
    <section
      id="kontakt"
      className="relative border-t border-white/10 bg-gradient-to-b from-transparent via-[#0B0A09]/85 to-[#0B0A09] py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <p className="label mb-4">05 / Kontakt</p>
          <h2
            id="contact-heading"
            className="max-w-[14ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Objednejte stůl{" "}
            <em className="font-serif font-normal italic text-accent">nebo kuchyni</em>
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
            Zaměření a 3D návrh zdarma při realizaci. {SITE.region}. Hodnocení{" "}
            <span className="tabular-nums text-accent">{SITE.rating} ★</span> Google (
            <span className="tabular-nums">{SITE.reviews}</span> recenzí).
          </p>

          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="label">Telefon</dt>
              <dd className="mt-1">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-11 items-center text-lg font-semibold tabular-nums underline-offset-4 hover:underline"
                >
                  {SITE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">E-mail</dt>
              <dd className="mt-1">
                <a
                  href={SITE.emailHref}
                  className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Dílna</dt>
              <dd className="mt-1">
                <a
                  href={SITE.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                >
                  {SITE.address}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Otevírací doba</dt>
              <dd className="mt-1.5 tabular-nums text-ink/90">{SITE.hours}</dd>
            </div>
          </dl>
        </div>

        <form
          className="rounded-2xl border border-black/10 bg-paper p-6 text-ink-dark shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:p-8"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="text-xl font-semibold tracking-tight">Nezávazná poptávka</h3>
          <p className="mt-2 text-sm text-[#5c5752]">
            Napište rozměr stolu nebo typ zakázky — ozveme se do 24 hodin.
          </p>

          {sent ? (
            <p
              className="mt-5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm"
              role="status"
            >
              Děkujeme. V ostré verzi poptávku doručíme na e-mail dílny.
            </p>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">Jméno</span>
              <input className="field" name="name" autoComplete="name" required />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">Telefon</span>
              <input
                className="field tabular-nums"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
              />
            </label>
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-sm font-medium">E-mail</span>
              <input
                className="field"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-sm font-medium">Zpráva</span>
              <textarea
                className="field"
                name="message"
                rows={4}
                required
                placeholder="např. jídelní stůl 1800 mm, dub, Brno-střed"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn btn-dark w-full sm:w-auto">
              Odeslat poptávku
            </button>
            <a href={SITE.phoneHref} className="btn btn-ghost w-full tabular-nums text-ink sm:w-auto !bg-ink-dark/5 !border-ink-dark/20 !text-ink-dark">
              Zavolat: {SITE.phone}
            </a>
          </div>
        </form>
      </div>

      <footer className="wrap mt-16 border-t border-white/10 pt-8 text-sm text-muted">
        Ukázkový koncept webu • Vytvořil Honza | Webanyl
      </footer>
    </section>
  );
}
