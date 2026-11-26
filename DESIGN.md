# DESIGN.md — Truhlářství Dvořák (Parallel Studios 3D)

## Brand & Art Direction

Cinematic product story kolem **jednoho** stolu z olejovaného dubu. Tmavé studio `#0B0A09`, papír `#F5F2EB`, mosaz `#C6923C`. Scroll + „Podržet pro rozklad“ řídí 3D engine; HTML jen vypráví.

## Color Tokens

| Token | Hex | Role |
| --- | --- | --- |
| `--bg` | `#0B0A09` | plátno |
| `--ink` | `#F5F2EB` | text |
| `--muted` | `#A39E95` | sekundární |
| `--accent` | `#C6923C` | mosaz / CTA |
| `--paper` | `#EDE7DB` | formulář |

## Typography

- Display: **Plus Jakarta Sans**
- Accent: **Instrument Serif** italic
- Labels: uppercase tracking `0.2em`, `tabular-nums` na kótách

## Layout Map

1. Fixed `<canvas>` fullscreen z-0
2. Scroll chapters (hero → detail → exploded → around → kontakt)
3. Hold control (fixed, pointer-events auto)
4. Mode A footer + floating badge

## Motion

`cubic-bezier(0.22, 1, 0.36, 1)`. Camera + explode lerped. `prefers-reduced-motion`: static frame at progress 0.

## 3D Production Rules

1. Real mm → meters (`/1000`)
2. Separate meshes, explode along assembly axes
3. Oak + brushed brass PBR
4. Soft studio light, contact shadow plane
5. DPR ≤ 1.75, dispose on unmount
