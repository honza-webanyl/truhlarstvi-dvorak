export const SITE = {
  name: "Truhlářství Dvořák",
  phone: "+420 774 812 390",
  phoneHref: "tel:+420774812390",
  email: "info@truhlarstvi-dvorak-brno.cz",
  emailHref: "mailto:info@truhlarstvi-dvorak-brno.cz",
  address: "Kšírova 245/18, 619 00 Brno-jih",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=K%C5%A1%C3%ADrova%20245%2F18%2C%20619%2000%20Brno-jih",
  hours: "Po–Pá: 7:30 – 16:30",
  rating: "4.9",
  reviews: "68",
  region: "Brno a okolí",
} as const;

export const NAV = [
  { href: "#nabytek", label: "Nábytek na míru" },
  { href: "#realizace", label: "Realizace" },
  { href: "#konstrukce", label: "Konstrukce" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export type Category = {
  id: string;
  title: string;
  price: string;
  lead: string;
  leadTime: string;
  specs: string[];
  image: string;
  imageAlt: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "kuchyne",
    title: "Kuchyně na míru",
    price: "od 95 000 Kč",
    lead: "výběrový dub / dýha, kování Blum Legrabox, kamenné i masivní desky",
    leadTime: "dodání 5–7 týdnů",
    specs: ["Dub / dýha", "Blum Legrabox", "Masivní desky", "5–7 týdnů"],
    image:
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Moderní dubová kuchyně s ostrůvkem",
  },
  {
    id: "skrine",
    title: "Vestavěné skříně a šatny",
    price: "od 28 000 Kč",
    lead: "od podlahy ke stropu na milimetr, tiché posuvné i otočné systémy, integrované LED",
    leadTime: "dodání 3–4 týdny",
    specs: ["Na milimetr", "Tiché systémy", "LED osvětlení", "3–4 týdny"],
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Vestavěná šatna s dřevěnými policemi",
  },
  {
    id: "stoly",
    title: "Jídelní stoly a masiv",
    price: "od 18 000 Kč",
    lead: "masivní dub a americký ořech tl. 40 mm, tvrdý voskový olej Osmo",
    leadTime: "dodání 3–5 týdnů",
    specs: ["Dub / ořech 40 mm", "Osmo olej", "Čepovaná konstrukce", "3–5 týdnů"],
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Masivní jídelní stůl v interiéru",
  },
  {
    id: "koupelny",
    title: "Koupelnový a solitérní nábytek",
    price: "od 16 000 Kč",
    lead: "odolná úprava do vlhka, skříňky pod umyvadlo, knihovny, předsíně",
    leadTime: "dodání 3–4 týdny",
    specs: ["Do vlhka", "Pod umyvadlo", "Knihovny", "3–4 týdny"],
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Koupelnový nábytek z masivu",
  },
];

export const GALLERY = [
  {
    id: "g1",
    title: "Dubová kuchyně",
    place: "Brno-Komín",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    alt: "Svělá kuchyně s dřevěnými deskami",
  },
  {
    id: "g2",
    title: "Šatna na míru",
    place: "Brno-Židenice",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=80",
    alt: "Otevřená šatna s dřevěnými policemi",
  },
  {
    id: "g3",
    title: "Jídelní stůl",
    place: "Brno-střed",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1400&q=80",
    alt: "Jídelní stůl z masivu u okna",
  },
  {
    id: "g4",
    title: "Koupelnová sestava",
    place: "Brno-Líšeň",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=80",
    alt: "Koupelna s dřevěným nábytkem",
  },
] as const;

export const PROCESS = [
  {
    n: "01",
    title: "Zaměření na místě zdarma",
    text: "Přijedeme, změříme prostor a projdeme provoz domácnosti i dispozici.",
  },
  {
    n: "02",
    title: "3D vizualizace a přesná kalkulace",
    text: "Dostanete 3D návrh, materiálové varianty a pevnou cenu bez dohadů.",
  },
  {
    n: "03",
    title: "Výroba v brněnské dílně",
    text: "Nábytek vzniká na Kšírové — kontrolujeme každý spoj i povrch.",
  },
  {
    n: "04",
    title: "Čistá montáž na klíč",
    text: "Dovezeme, smontujeme a uklidíme. Odcházíme, až vše sedí na milimetr.",
  },
] as const;

export const REVIEWS = [
  {
    stars: "4.9",
    text: "Kuchyně přesně podle 3D návrhu. Montáž čistá, termín drželi. Doporučuju.",
    author: "T. Nováková",
    place: "Brno-Žabovřesky",
  },
  {
    stars: "5.0",
    text: "Vestavěná šatna od podlahy ke stropu. Sedí na milimetr, LED je praktická.",
    author: "M. Horák",
    place: "Brno-Královo Pole",
  },
] as const;

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=80";

export const JOINERY_LABELS = [
  { id: "01", label: "01 Kartáčovaná mosaz" },
  { id: "02", label: "02 Tvrzené sklo 8 mm" },
  { id: "03", label: "03 Přesný čep Blum" },
  { id: "04", label: "04 Tolerance 0.05 mm" },
] as const;
