# DESIGN.md — Truhlářství Dvořák

## Brand & Art Direction

Ultra-clean architektonický showroom + skryté 3D kování (Parallel Studios). Temný plát `#0B0A09`, papír `#F5F2EB`, mosaz `#D4A359`. Fotografie nábytku ostré, **bez tmavé mlhy**. 3D spoj na pozadí `opacity-85`, text vždy čitelný.

## Color Tokens

| Token | Hex / value | Role |
| --- | --- | --- |
| `--bg` | `#0B0A09` | plátno |
| `--ink` | `#F5F2EB` | text |
| `--muted` | `#A39E95` | sekundární |
| `--accent` | `#D4A359` | mosaz / CTA |
| `--line` | `rgba(255,255,255,0.10)` | 1px konstrukce |
| `--paper` | `#EDE7DB` | formulář |

## Typography

- UI / display: **Plus Jakarta Sans**
- Accent italic: **Instrument Serif**
- Labels: `0.65rem`, tracking `0.2em`, uppercase

## Layout Map

1. Sticky nav (brand · odkazy · zavolat)
2. Hero split: typografie + ostrá fotka kuchyně
3. Showroom 4 kategorií + galerie + lightbox
4. Postup 01–04 + 2 recenze
5. Kontakt + formulář
6. Fixed WebGL canvas (HardwareEngine) + HUD (blueprint / hold)
7. Mode A footer + floating badge

## 3D (HardwareEngine)

Joinery v mm, bevel 0.05 mm, PMREM studio, cursor env rotation, scroll cues, explode + Web Audio click, blueprint EdgesGeometry, DPR ≤ 1.75.
