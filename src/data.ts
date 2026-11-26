export const SITE = {
  name: "Truhlářství Dvořák",
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

export const CHAPTERS = [
  {
    id: "hero",
    at: 0,
    label: "01",
    title: "Stůl z masivu",
    accent: "na míru",
    body: "Olejovaný dub, čepovaná konstrukce a kartáčovaná mosaz. Zakázková výroba v brněnské dílně.",
  },
  {
    id: "detail",
    at: 0.28,
    label: "02",
    title: "Hrana a kování",
    accent: "detail",
    body: "Sražená hrana desky, průchozí čep a mosazný spoj — každý spoj drží i po letech provozu.",
  },
  {
    id: "apart",
    at: 0.58,
    label: "03",
    title: "Rozklad konstrukce",
    accent: "kóty",
    body: "1800 × 900 × 750 mm. Podržte tlačítko nebo scrollujte — uvidíte, jak se stůl skládá.",
  },
  {
    id: "around",
    at: 0.8,
    label: "04",
    title: "Obkroužení",
    accent: "kolem",
    body: "Stejný kus ze všech stran. Žádný plastový lesk — jen olejovaný povrch a měkké studio světlo.",
  },
  {
    id: "contact",
    at: 1,
    label: "05",
    title: "Zpátky vcelku",
    accent: "kontakt",
    body: "Chcete stůl, kuchyni nebo vestavěnou skříň? Zaměření a 3D návrh zdarma při realizaci.",
  },
] as const;

export const DIMS = [
  { id: "len", label: "Délka", value: "1800 mm" },
  { id: "wid", label: "Šířka", value: "900 mm" },
  { id: "hei", label: "Výška", value: "750 mm" },
] as const;
