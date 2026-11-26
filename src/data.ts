
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
  { href: "#presnost", label: "Přesnost" },
  { href: "#detail", label: "Detail" },
  { href: "#konstrukce", label: "Konstrukce" },
  { href: "#realizace", label: "Realizace" },
  { href: "#poptavka", label: "Poptávka" },
] as const;

export const SERVICES = [
  {
    n: "01",
    title: "Kuchyně na míru",
    text: "Výběrový dub a jasan, Blum Legrabox, desky na milimetr. Od 95 000 Kč, dodání 5–7 týdnů.",
  },
  {
    n: "02",
    title: "Vestavěné skříně",
    text: "Od podlahy ke stropu, tiché systémy a LED. Od 28 000 Kč, dodání 3–4 týdny.",
  },
  {
    n: "03",
    title: "Masiv a stoly",
    text: "Dub a ořech tl. 40 mm, olej Osmo. Od 18 000 Kč, dodání 3–5 týdnů.",
  },
] as const;
