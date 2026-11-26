# DESIGN.md — Truhlářství Dvořák

## Brand & Art Direction

Parallel Studios live-3D systém: jedno plátno vzadu, typografie vpředu. Objekt = zakázkový truhlářský pokosník (mosaz / ocel / skleněná libela). Žádné fotky, žádné těžké karty. Temný fotoateliér `#080809`, papír `#F4F1EA`, mosazný akcent `#C9A36A`.

## Color Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#080809` | plátno |
| `--ink` | `#F4F1EA` | text |
| `--muted` | `#9A948A` | sekundární |
| `--accent` | `#C9A36A` | mosaz / CTA |
| `--line` | `rgba(244,241,234,0.12)` | 1px konstrukce |

## Typography

- Display / UI: **Plus Jakarta Sans**
- Kurzívní akcent: **Instrument Serif** italic
- Labels: uppercase, tracking `0.2em`

## Layout Map

1. Sticky nav + zvuk
2. 01 Přesnost (Hero)
3. 02 Detail
4. 03 Konstrukce (explode labels)
5. 04 Realizace
6. 05 Poptávka + Mode A footer
7. Fixed canvas + HUD (blueprint / hold)

## 3D (PrecisionEngine)

mm geometrie, bevel 0.05 mm, PMREM studio, scroll cues, staggered explode, blueprint EdgesGeometry, Web Audio, bloom + ACES + grain, DPR ≤ 1.75, `compileAsync`.
