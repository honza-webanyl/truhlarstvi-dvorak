import { PROCESS, REVIEWS } from "../data";

type Props = { reveal: boolean };

export function Process({ reveal }: Props) {
  return (
    <section id="konstrukce" className="border-b border-line py-20 md:py-28" aria-labelledby="process-heading">
      <div className={`wrap ${reveal ? "reveal is-on" : "reveal"}`}>
        <p className="label mb-4">02 / Postup</p>
        <h2 id="process-heading" className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Od zaměření po <em className="font-serif font-normal italic text-accent">montáž</em>
        </h2>
        <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {PROCESS.map((step) => (
            <li key={step.n} className="grid gap-4 py-8 md:grid-cols-[7rem_1fr] md:items-baseline md:gap-10 md:py-10">
              <span className="font-serif text-4xl italic tabular-nums text-accent md:text-5xl">{step.n}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{step.title}</h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <blockquote key={r.author} className="border border-line bg-black/25 p-6 md:p-8">
              <p className="tabular-nums text-sm font-semibold text-accent">{r.stars} ★</p>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/85">„{r.text}“</p>
              <footer className="mt-5 text-sm text-muted">{r.author} · {r.place}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
