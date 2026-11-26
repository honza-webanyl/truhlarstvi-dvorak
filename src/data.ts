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
} as const;

export const NAV = [
  { href: "#nabytek", label: "Nábytek na míru" },
  { href: "#realizace", label: "Realizace" },
  { href: "#postup", label: "Postup" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export type Category = {
  id: string;
  tab: string;
  title: string;
  price: string;
  lead: string;
  leadTime: string;
  materials: string;
  image: string;
  imageAlt: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "kuchyne",
    tab: "01 Kuchyně na míru",
    title: "Kuchyně na míru",
    price: "od 95 000 Kč",
    lead: "výběrový dub a jasan, kování Blum Legrabox, kamenné i masivní pracovní desky",
    leadTime: "dodání 5–7 týdnů",
    materials: "Dub / jasan · Blum · desky na míru",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Světlá dubová kuchyně na míru",
  },
  {
    id: "skrine",
    tab: "02 Vestavěné skříně",
    title: "Vestavěné skříně a šatny",
    price: "od 28 000 Kč",
    lead: "od podlahy ke stropu na milimetr, tiché posuvné i otočné systémy, integrované LED",
    leadTime: "dodání 3–4 týdny",
    materials: "Dýha / lak · tiché systémy · LED",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Vestavěná šatna s dřevěnými policemi",
  },
  {
    id: "stoly",
    tab: "03 Masivní stoly",
    title: "Jídelní stoly a masiv",
    price: "od 18 000 Kč",
    lead: "masivní dub a americký ořech tl. 40 mm, tvrdý voskový olej Osmo",
    leadTime: "dodání 3–5 týdnů",
    materials: "Dub / ořech 40 mm · Osmo olej",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Masivní jídelní stůl u okna",
  },
  {
    id: "koupelny",
    tab: "04 Koupelnový nábytek",
    title: "Koupelnový a solitérní nábytek",
    price: "od 16 000 Kč",
    lead: "odolná úprava do vlhka, skříňky pod umyvadlo, knihovny i předsíně",
    leadTime: "dodání 3–4 týdny",
    materials: "Do vlhka · pod umyvadlo · solitéry",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Koupelnový nábytek z dřeva",
  },
];

export const GALLERY = [
  {
    id: "g1",
    title: "Kuchyně",
    place: "Brno-Komín",
    material: "Masivní dub",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    alt: "Dubová kuchyně — Brno-Komín",
  },
  {
    id: "g2",
    title: "Šatna",
    place: "Masarykova čtvrť",
    material: "Dubová dýha",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=80",
    alt: "Šatna na míru — Masarykova čtvrť",
  },
  {
    id: "g3",
    title: "Dubový stůl",
    place: "Žabovřesky",
    material: "Dub 40 mm · Osmo",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
    alt: "Dubový stůl — Žabovřesky",
  },
  {
    id: "g4",
    title: "Koupelna",
    place: "Královo Pole",
    material: "Lak do vlhka",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80",
    alt: "Koupelnová sestava — Královo Pole",
  },
] as const;

export const PROCESS = [
  {
    n: "01",
    title: "Zaměření zdarma",
    text: "Přijedeme, změříme prostor a projdeme provoz domácnosti.",
  },
  {
    n: "02",
    title: "3D návrh a kalkulace",
    text: "Dostanete 3D vizualizaci, materiálové varianty a pevnou cenu.",
  },
  {
    n: "03",
    title: "Výroba v Brně",
    text: "Nábytek vzniká na Kšírové — kontrolujeme každý spoj i povrch.",
  },
  {
    n: "04",
    title: "Čistá montáž",
    text: "Dovezeme, smontujeme a uklidíme. Odcházíme, až vše sedí.",
  },
] as const;

export const REVIEWS = [
  {
    stars: "4.9",
    text: "Kuchyně přesně podle 3D návrhu. Montáž čistá, termín drželi.",
    author: "T. Nováková",
    place: "Brno-Žabovřesky",
  },
  {
    stars: "4.9",
    text: "Vestavěná šatna od podlahy ke stropu. Sedí na milimetr.",
    author: "M. Horák",
    place: "Brno-Královo Pole",
  },
] as const;

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80";
