import { useEffect, useState } from 'react'
import { SITE } from '../data'

const LINKS = [
  { href: '#showroom', label: 'Showroom' },
  { href: '#materialy', label: 'Materiály' },
  { href: '#proces', label: 'Proces' },
  { href: '#konfigurator', label: 'Konfigurátor' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-200 ease-out-strong ${
        scrolled || open
          ? 'border-white/10 bg-showroom/95 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-ink"
      >
        Přeskočit na obsah
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.25rem] md:px-8">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center text-sm font-semibold tracking-tight text-ink-soft transition-opacity hover:opacity-70"
        >
          {SITE.name}
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hlavní navigace">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[0.8125rem] text-muted-dark transition-colors duration-150 hover:text-ink-soft after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:ease-out-strong hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.phoneHref}
            className="btn-lift inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-4 text-[0.8125rem] font-medium text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-[#d4924a] active:scale-[0.98]"
          >
            Zavolat
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-white/15 text-ink-soft lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Zavřít menu' : 'Otevřít menu'}</span>
          <span aria-hidden className="flex w-5 flex-col gap-1.5">
            <span className={`block h-px bg-ink-soft transition-transform duration-200 ease-out-strong ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-px bg-ink-soft transition-opacity duration-150 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-ink-soft transition-transform duration-200 ease-out-strong ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className={`border-t border-white/10 bg-showroom lg:hidden ${open ? 'block' : 'hidden'}`}>
        <nav className="flex flex-col px-5 py-3" aria-label="Mobilní navigace">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center border-b border-white/10 text-base text-ink-soft last:border-0"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.phoneHref}
            className="mt-3 inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-4 font-medium text-ink active:scale-[0.98]"
            onClick={() => setOpen(false)}
          >
            Zavolat: {SITE.phone}
          </a>
        </nav>
      </div>
    </header>
  )
}
