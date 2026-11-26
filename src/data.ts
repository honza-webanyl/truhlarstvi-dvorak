export const SITE = {
  name: "Truhlářství Dvořák",
  shortName: "Dvořák",
  phone: "+420 774 812 390",
  phoneHref: "tel:+420774812390",
  email: "info@truhlarstvi-dvorak-brno.cz",
  emailHref: "mailto:info@truhlarstvi-dvorak-brno.cz",
  address: "Kšírova 245/18, Brno-jih",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=K%C5%A1%C3%ADrova%20245%2F18%2C%20Brno-jih",
  hours: "Po–Pá 7:30–16:30",
  rating: "4.9",
  reviews: "68",
  region: "Brno a okolí",
} as const;

export const NAV = [
  { href: "#realizace", label: "Realizace" },
  { href: "#postup", label: "Postup" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export type Service = {
  id: string;
  title: string;
  price: string;
  summary: string;
  detail: string;
  specs: string[];
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    id: "kuchyne",
    title: "Kuchyně na míru",
    price: "od 95 000 Kč",
    summary: "Masiv dub, kování Blum, přesné spáry a čistá montáž.",
    detail:
      "Navrhujeme a vyrábíme kuchyně podle dispozice bytu. Korpusy a dvířka z dubového masivu, vnitřní vybavení Blum a tiché dovírání. Po zaměření dostanete 3D návrh i pevnou cenu.",
    specs: ["Masiv dub", "Kování Blum", "3D návrh zdarma", "Montáž na klíč"],
    image:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Moderní dubová kuchyně s ostrůvkem a teplým denním světlem",
  },
  {
    id: "skrine",
    title: "Vestavěné skříně a šatny",
    price: "od 28 000 Kč",
    summary: "Od podlahy ke stropu, LED osvětlení, maximální úložný prostor.",
    detail:
      "Šatny a vestavěné skříně stavíme přesně do niky. Posuvné i otočné dveře, vnitřní organizéry a LED pásky, které prostor nezahltí teplem.",
    specs: ["Od podlahy ke stropu", "LED osvětlení", "Vnitřní organizéry", "Brno a okolí"],
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Vestavěná šatna s dřevěnými policemi a osvětlením",
  },
  {
    id: "nabytek",
    title: "Nábytek z masivu a koupelny",
    price: "od 18 000 Kč",
    summary: "Jídelní stoly, postele a koupelnový nábytek z dubu a jasanu.",
    detail:
      "Stoly, postele, lavice i koupelnové skříňky vyrábíme z vybraného masivu. Každý kus je sestavený v brněnské dílně a povrchově upravený podle provozu místnosti.",
    specs: ["Dub / jasan", "Jídelní stoly", "Postele", "Koupelnový nábytek"],
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Masivní dřevěný jídelní stůl v interiéru",
  },
  {
    id: "zamerovani",
    title: "Zaměření a 3D návrh zdarma",
    price: "0 Kč při realizaci",
    summary: "Přijedeme, zaměříme a připravíme 3D návrh i kalkulaci.",
    detail:
      "V Brně a okolí přijedeme na zaměření. Dostanete 3D vizualizaci, materiálovou variantu a pevnou nabídku. Při objednání výroby je zaměření i návrh zdarma.",
    specs: ["Brno a okolí", "3D vizualizace", "Pevná kalkulace", "0 Kč při realizaci"],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Architektura a návrh interiéru s plány na stole",
  },
];

export const PROCESS = [
  {
    n: "01",
    title: "Zaměření zdarma",
    text: "Přijedeme k vám, změříme prostor a projdeme dispozici i provoz domácnosti.",
  },
  {
    n: "02",
    title: "3D návrh a kalkulace",
    text: "Připravíme 3D vizualizaci, materiálové varianty a pevnou cenu bez dohadů.",
  },
  {
    n: "03",
    title: "Výroba v brněnské dílně",
    text: "Nábytek vzniká v naší dílně na Kšírové — kontrolujeme každý spoj i povrch.",
  },
  {
    n: "04",
    title: "Čistá montáž na klíč",
    text: "Dovezeme, smontujeme a uklidíme. Odcházíme až když vše sedí na milimetr.",
  },
] as const;

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80";
