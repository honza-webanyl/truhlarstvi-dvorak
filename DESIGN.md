# DESIGN.md — Truhlářství Dvořák

## Reference synthesis (`_ref_videa`)

| Video | Extracted pattern |
| --- | --- |
| `8.mp4` LASTDEPT | Tmavá stěna-showroom, skleněné police, bodové podsvícení aktivní karty (warm glow) |
| `2.mp4` / `3.mp4` Omnya | Editorial: velké kapitálky + kurzívní akcent, číslované kroky `03 / THE CANVAS` |
| `9.mp4` / `4.mp4` | Full-bleed ostrá fotografie, tenký HUD header, typografie vrstvená přes obraz |

## Brand & Atmosphere

Cinematic showroom × řemeslný ateliér. Tmavý plát `#121212`, ostré fotografie dřeva **bez mlhy**, aktivní stavy v teplé mosazi `#E08A3C`.

## Color Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#121212` | hlavní plátno |
| `--bg-elev` | `#1A1A1A` | karty / panely |
| `--paper` | `#F4EFE6` | formulář / světlý pás |
| `--ink` | `#F4EFE6` | text na tmavém |
| `--ink-dark` | `#141312` | text na papíru |
| `--muted` | `#9A9590` | sekundární |
| `--accent` | `#E08A3C` | glow, CTA, kurzíva |
| `--line` | `rgba(255,255,255,0.08)` | rámy |

## Typography

- Display / UI: **Plus Jakarta Sans** (600–700)
- Accent italic: **Instrument Serif**
- Labels: `text-[0.65rem] uppercase tracking-[0.22em]`

## Layout Map

1. **Hero** — ostrá kuchyně full-bleed, velké `DVOŘÁK` / *na míru*, 4.9★, CTA
2. **Realizace** — 4 nasvícené karty (shelf glow), detail modal
3. **Postup 01–04** — Omnya-style numbered narrative
4. **Kontakt** — papírový formulář + údaje
5. Footer Mode A + floating badge

## Motion

`cubic-bezier(0.22, 1, 0.36, 1)`. Card underglow opacity 200–280ms. Press `scale(0.98)`. Modal 300ms ease-out. `prefers-reduced-motion` respektován.
