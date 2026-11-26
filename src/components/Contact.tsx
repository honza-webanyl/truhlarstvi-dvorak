import { useState, type FormEvent } from "react";
import { SITE } from "../data";

export function Contact() {
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
      className="border-t border-line bg-paper py-20 text-ink-dark md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a64]">
            03 / Kontakt
          </p>
          <h2
            id="contact-heading"
            className="max-w-[14ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Napište nebo{" "}
            <em className="font-serif font-normal italic text-accent">zavolejte</em>
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-[#5c5752]">
            Odpovíme do 24 hodin v pracovní dny. Zaměření v Brně a okolí
            domluvíme telefonicky.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a64]">
                Telefon
              </dt>
              <dd className="mt-1.5">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-11 items-center text-lg font-semibold tabular-nums underline-offset-4 hover:underline"
                >
                  {SITE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a64]">
                E-mail
              </dt>
              <dd className="mt-1.5">
                <a
                  href={SITE.emailHref}
                  className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a64]">
                Dílna
              </dt>
              <dd className="mt-1.5">
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
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a64]">
                Otevírací doba
              </dt>
              <dd className="mt-1.5 tabular-nums">{SITE.hours}</dd>
            </div>
          </dl>
        </div>

        <form
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(20,19,18,0.08)] md:p-8"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="text-xl font-semibold tracking-tight">Nezávazná poptávka</h3>
          <p className="mt-2 text-sm text-[#5c5752]">
            Stručně popište zakázku — ozveme se s termínem zaměření.
          </p>

          {sent ? (
            <p
              className="mt-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm"
              role="status"
            >
              Děkujeme. Poptávka je připravená k odeslání — v ostré verzi ji
              doručíme na e-mail dílny.
            </p>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 sm:col-span-1">
              <span className="text-sm font-medium">Jméno</span>
              <input className="field" name="name" autoComplete="name" required />
            </label>
            <label className="block space-y-1.5 sm:col-span-1">
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
              <span className="text-sm font-medium">Typ zakázky</span>
              <select className="field" name="service" defaultValue="" required>
                <option value="" disabled>
                  Vyberte…
                </option>
                <option value="kuchyne">Kuchyně na míru</option>
                <option value="skrine">Vestavěné skříně a šatny</option>
                <option value="nabytek">Nábytek z masivu a koupelny</option>
                <option value="zamerovani">Zaměření a 3D návrh</option>
              </select>
            </label>
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-sm font-medium">Zpráva</span>
              <textarea
                className="field"
                name="message"
                rows={4}
                required
                placeholder="např. kuchyně do bytu 3+kk, Brno-Židenice"
              />
            </label>
          </div>

          <button type="submit" className="btn btn-dark mt-6 w-full sm:w-auto">
            Odeslat poptávku
          </button>
        </form>
      </div>
    </section>
  );
}
