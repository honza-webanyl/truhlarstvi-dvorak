# DESIGN.md — Truhlářství Dvořák

## Brand & Art Direction

Showroom × architectural craft: střídání tmavého kouřového showroomu s bodovými světly a teplého papírového výkresového plátu. Atmosféra nočního ateliéru a denního truhlářského stolu.

**Scene A (showroom):** `#0D0C0B` + radiální mosazné světlo `rgba(200,130,59,0.14)`.
**Scene B (výkres):** `#F2EDE4`, linky `#D6CEC0`, ink `#141312`.
**Accent:** kartáčovaná mosaz `#C8823B`.

## Color Tokens

| Token | Hex / value | Role |
| --- | --- | --- |
| `--showroom` | `#0D0C0B` | tmavé sekce |
| `--paper` | `#F2EDE4` | výkres & vzorník |
| `--ink` | `#141312` | text na papíru |
| `--ink-soft` | `#F2EDE4` | text na showroomu |
| `--muted-dark` | `#A39E96` | sekundární na tmavém |
| `--muted-light` | `#5F5A52` | sekundární na papíru |
| `--accent` | `#C8823B` | spotlight, aktivní stavy |
| `--line-dark` | `rgba(255,255,255,0.08)` | rámy výklenků |
| `--line-paper` | `#D6CEC0` | výkresové linky |

## Typography

- Display / UI: **Plus Jakarta Sans**
- Accent italic: **Instrument Serif**
- Section labels: `text-xs uppercase tracking-[0.2em]`

## Section Map

1. Hero — vrstvená typografie DVOŘÁK / MASIV NA MÍRU přes fotografii
2. 01 Showroom realizací — spotlight niches + detail panel
3. 02 Architektura & materiály — SVG kóty + vzorník
4. 03 Proces výroby — sticky kroky 01–04
5. 04 Konfigurátor zakázky + kontaktní lišta
6. Footer Mode A + floating badge

## Motion

`cubic-bezier(0.22, 1, 0.36, 1)`. Spotlight glow na hover (opacity). Press `scale(0.98)`. Lightbox / panel 300–400ms ease-out. `prefers-reduced-motion` vypíná transformy.
