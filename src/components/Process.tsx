import { PROCESS } from "../data";

export function Process() {
  return (
    <section
      id="postup"
      className="border-t border-line py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="wrap">
        <p className="label mb-4">02 / Postup</p>
        <h2
          id="process-heading"
          className="max-w-[16ch] text-balance text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Od zaměření po{" "}
          <em className="font-serif font-normal italic text-accent">montáž</em>
        </h2>

        <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {PROCESS.map((step) => (
            <li
              key={step.n}
              className="grid gap-4 py-8 md:grid-cols-[7rem_1fr] md:items-baseline md:gap-10 md:py-10"
            >
              <span className="font-serif text-4xl italic tabular-nums text-accent md:text-5xl">
                {step.n}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
