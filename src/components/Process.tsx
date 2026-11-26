import { PROCESS, REVIEWS } from "../data";

export function Process() {
  return (
    <section
      id="postup"
      className="border-b border-line py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="wrap">
        <p className="label mb-4">03 / Postup</p>
        <h2
          id="process-heading"
          className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Od zaměření po montáž
        </h2>

        <ol className="mt-12 grid gap-0 border border-line md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <li
              key={step.n}
              className={`border-line p-6 md:p-7 ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
            >
              <span className="font-serif text-3xl italic tabular-nums text-accent">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <blockquote key={r.author} className="border border-line bg-surface p-6 md:p-8">
              <p className="tabular-nums text-sm font-semibold text-accent">
                {r.stars} ★
              </p>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-ink">
                „{r.text}“
              </p>
              <footer className="mt-5 text-sm text-muted">
                {r.author} · {r.place}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
