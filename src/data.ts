export const SITE = {
  name: 'Truhlářství Dvořák',
  phone: '+420 774 812 390',
  phoneHref: 'tel:+420774812390',
  email: 'info@truhlarstvi-dvorak-brno.cz',
  emailHref: 'mailto:info@truhlarstvi-dvorak-brno.cz',
  address: 'Kšírova 245/18, 619 00 Brno-jih',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=K%C5%A1%C3%ADrova+245%2F18%2C+619+00+Brno-jih',
  hours: 'Po–Pá: 7:30 – 16:30',
  hoursNote: 'Osobní schůzky i o víkendu po domluvě',
  rating: '4.9',
  reviews: '68',
} as const

export const SHOWROOM = [
  {
    id: 'komin',
    title: 'Kuchyně Komín',
    place: 'Brno-Komín',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=85',
    alt: 'Moderní dubová kuchyně s ostrůvkem',
    material: 'Dub přírodní, olejovaná úprava',
    hardware: 'Blum MerivoBox + Clip top Blumotion',
    size: 'L 4 200 × H 2 400 mm',
    lead: '5 týdnů',
    price: '186 000',
  },
  {
    id: 'masarykova',
    title: 'Šatna Masarykova čtvrť',
    place: 'Brno-střed',
    src: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=85',
    alt: 'Vestavěná šatna s dřevěnými policemi',
    material: 'Jasan bílý kartáčovaný',
    hardware: 'Posuvný systém + LED pásky',
    size: 'L 3 100 × H 2 650 mm',
    lead: '4 týdny',
    price: '64 000',
  },
  {
    id: 'zabovresky',
    title: 'Dubový stůl Žabovřesky',
    place: 'Brno-Žabovřesky',
    src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=85',
    alt: 'Masivní dubový jídelní stůl',
    material: 'Dub masiv 40 mm, olej',
    hardware: 'Skryté spojení, nastavitelné nohy',
    size: '2 200 × 950 × 750 mm',
    lead: '3 týdny',
    price: '42 000',
  },
  {
    id: 'kralovo',
    title: 'Koupelna Královo Pole',
    place: 'Brno-Královo Pole',
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85',
    alt: 'Koupelnová sestava z odolného dřeva',
    material: 'Dub + voděodolná úprava',
    hardware: 'Blum soft-close',
    size: 'L 2 400 mm',
    lead: '4 týdny',
    price: '58 000',
  },
  {
    id: 'dilna',
    title: 'Výroba Kšírova',
    place: 'Brno-jih',
    src: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=85',
    alt: 'Truhlářská dílna s opracováním masivu',
    material: 'Masiv dle zakázky',
    hardware: 'Blum / Grass dle specifikace',
    size: 'Zakázkové kusy',
    lead: '4–6 týdnů',
    price: 'od 18 000',
  },
] as const

export const MATERIALS = [
  {
    id: 'dub',
    code: '01',
    name: 'Dub přírodní olejovaný',
    tone: '#B8956A',
    props: 'Tvrdý masiv s jemnou kresbou. Olejovaná úprava zvýrazní hloubku a nechá dřevo dýchat.',
    durability: 'Vysoká — vhodné pro kuchyně i stoly s denním provozem',
    use: 'Kuchyně, jídelní stoly, obývací sestavy',
    tier: 'Střední až prémiová hladina',
  },
  {
    id: 'orech',
    code: '02',
    name: 'Americký ořech',
    tone: '#5C4033',
    props: 'Tmavší, elegantní kresba. Stabilní masiv s výrazným charakterem.',
    durability: 'Vysoká — odolný vůči běžnému opotřebení',
    use: 'Reprezentativní interiéry, skříně, stoly',
    tier: 'Prémiová hladina',
  },
  {
    id: 'jasan',
    code: '03',
    name: 'Jasan bílý kartáčovaný',
    tone: '#D9CFC0',
    props: 'Světlý, kartáčovaný povrch zvýrazní strukturu vláken a působí čistě.',
    durability: 'Střední až vysoká — ideální do suchých prostor',
    use: 'Šatny, ložnice, vestavěné skříně',
    tier: 'Střední hladina',
  },
  {
    id: 'blum',
    code: '04',
    name: 'Kování Blum Legrabox',
    tone: '#8A8680',
    props: 'Přesné výsuvy a soft-close. Dlouhá životnost a tichý chod.',
    durability: 'Velmi vysoká — industriální standard',
    use: 'Kuchyně, skříně, koupelnové sestavy',
    tier: 'Standard v našich zakázkách',
  },
] as const

export const PROCESS = [
  {
    n: '01',
    title: 'Zaměření',
    italic: 'Přesnost na milimetr.',
    body: 'Přijedeme k vám v Brně a okolí, změříme prostor a probereme, jak má nábytek fungovat ve vašem dni. Zaměření je při realizaci zdarma.',
    pill: '01 Zaměření zdarma',
  },
  {
    n: '02',
    title: '3D návrh & kalkulace',
    italic: 'Vidíte výsledek dřív než první řez.',
    body: 'Připravíme 3D vizualizaci, výběr dekorů a konkrétní cenu. Upravíme dispozici, dokud sedí rozměr i rozpočet.',
    pill: '02 3D návrh & kalkulace',
  },
  {
    n: '03',
    title: 'Výroba v Brně',
    italic: 'Korpusy a detaily z vlastní dílny.',
    body: 'Vyrábíme na Kšírové. Sledujeme přesnost spojů, povrchovou úpravu a kování Blum před vývozem na montáž.',
    pill: '03 Výroba v Brně',
  },
  {
    n: '04',
    title: 'Čistá montáž',
    italic: 'Usadíme, zapojíme, uklidíme.',
    body: 'Montáž u vás včetně spotřebičů dle dohody. Odneseme zbytky a předáme hotovou realizaci k užívání.',
    pill: '04 Čistá montáž',
  },
] as const

export const CONFIG = {
  types: [
    { id: 'kitchen', label: 'Kuchyně na míru', basePerM: 42000, lead: '5–6 týdnů' },
    { id: 'wardrobe', label: 'Vestavěná skříň', basePerM: 18000, lead: '4–5 týdnů' },
    { id: 'table', label: 'Masivní stůl & interiér', basePerM: 14000, lead: '3–5 týdnů' },
  ],
  woods: [
    { id: 'oak', label: 'Dub masiv', factor: 1.15 },
    { id: 'walnut', label: 'Americký ořech', factor: 1.28 },
    { id: 'lamino', label: 'Prémiové lamino + dýha', factor: 0.92 },
  ],
  extras: [
    { id: 'viz', label: '3D vizualizace', amount: 0 },
    { id: 'led', label: 'Integrované LED osvětlení', amount: 6500 },
    { id: 'blum', label: 'Prémiové kování Blum', amount: 9800 },
  ],
} as const

export const HERO_PHOTO = {
  src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1600&q=85',
  alt: 'Světlá dřevěná kuchyně v moderním interiéru',
} as const
