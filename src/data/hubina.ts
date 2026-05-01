export type StopType = "pribeh" | "vyhlad" | "priroda" | "prakticke";

export type Stop = {
  slug: string;
  name: string;
  type: StopType;
  routeSlug: string;
  shortDescription: string;
  story: string[];
  qrNote: string;
  mapPosition: {
    top: string;
    left: string;
  };
  order: number;
};

export type Route = {
  slug: string;
  name: string;
  subtitle: string;
  distance: string;
  duration: string;
  difficulty: string;
  description: string;
  stopSlugs: string[];
};

export const routes: Route[] = [
  {
    slug: "hubina-vyhlady",
    name: "Výhľady nad Hubinou",
    subtitle: "Prvý pracovný okruh",
    distance: "cca 5-7 km",
    duration: "2-3 h",
    difficulty: "stredná",
    description:
      "Kratší okruh z obce smerom ku krížovej ceste, Skalke a starému kameňolomu. Bude slúžiť ako prvá testovacia trasa pre QR zastavenia.",
    stopSlugs: ["krizova-cesta-kaplnka", "skalka", "stary-kamenolom"],
  },
  {
    slug: "velky-okruh",
    name: "Veľký okruh Hubinou",
    subtitle: "Návrh podľa mapového podkladu",
    distance: "cca 17-20 km",
    duration: "5-7 h",
    difficulty: "náročná",
    description:
      "Dlhšia turistická verzia s prírodnými bodmi, výhľadmi, prameňmi a praktickými zastávkami po ceste. Body budeme dopĺňať postupne.",
    stopSlugs: ["krizova-cesta-kaplnka", "skalka", "stary-kamenolom"],
  },
  {
    slug: "centrum-a-pribehy",
    name: "Centrum a príbehy obce",
    subtitle: "Budúci rodinný okruh",
    distance: "cca 2-3 km",
    duration: "45-75 min",
    difficulty: "ľahká",
    description:
      "Krátka mestská verzia pre rodiny, návštevníkov a školy. Sem neskôr pribudnú body v obci, hostince, pamätné miesta a praktické informácie.",
    stopSlugs: [],
  },
];

export const stops: Stop[] = [
  {
    slug: "krizova-cesta-kaplnka",
    name: "Krížová cesta / Kaplnka Božieho milosrdenstva",
    type: "pribeh",
    routeSlug: "hubina-vyhlady",
    shortDescription:
      "Duchovné a oddychové miesto nad obcou, vhodné ako prvé zastavenie po štarte z Hubiny.",
    story: [
      "Krížová cesta a kaplnka vytvárajú pokojný vstup do krajiny nad Hubinou. Je to miesto, kde sa obyčajná prechádzka začína meniť na pomalšie vnímanie okolia.",
      "V testovej verzii tu bude priestor na krátky príbeh o vzniku miesta, miestnych spomienkach a o tom, ako sa toto zastavenie používa počas roka.",
      "Po doplnení presných podkladov môže stránka obsahovať historické fotografie, text pre návštevníkov aj krátku zvukovú verziu príbehu.",
    ],
    qrNote:
      "QR kód na tomto mieste by mal návštevníka priviesť priamo sem, nie na hlavnú stránku.",
    mapPosition: { top: "26%", left: "26%" },
    order: 1,
  },
  {
    slug: "skalka",
    name: "Skalka",
    type: "vyhlad",
    routeSlug: "hubina-vyhlady",
    shortDescription:
      "Výhľadový bod nad Hubinou s dobrým miestom na vysvetlenie krajiny, smerov a okolitých vrchov.",
    story: [
      "Skalka je prirodzený bod, kde sa oplatí zastaviť a pozrieť späť na obec aj na zvlnený reliéf nad ňou.",
      "Do finálnej verzie sem môžeme doplniť orientačný opis výhľadu: čo človek vidí pred sebou, aké vrchy sú v okolí a ako krajina súvisí s každodenným životom Hubiny.",
      "Tento typ zastavenia je vhodný aj pre krátku fotogalériu alebo sezónne porovnanie výhľadu počas roka.",
    ],
    qrNote:
      "QR stránka môže fungovať ako malý orientačný sprievodca výhľadom.",
    mapPosition: { top: "22%", left: "34%" },
    order: 2,
  },
  {
    slug: "stary-kamenolom",
    name: "Starý kameňolom",
    type: "priroda",
    routeSlug: "hubina-vyhlady",
    shortDescription:
      "Miesto s prírodným a pracovným príbehom krajiny, vhodné na prepojenie geológie, remesla a lokálnej pamäti.",
    story: [
      "Starý kameňolom môže byť zastavením o tom, ako sa krajina používala a menila. Takéto miesta často nesú tichú stopu práce, materiálu a ciest, ktorými sa veci presúvali do obce.",
      "V ďalšej verzii sem doplníme presnejšie lokálne fakty: čo sa tu ťažilo, kto miesto využíval a aké spomienky sa k nemu viažu.",
      "Pre návštevníka môže ísť o krátky, zrozumiteľný príbeh o vzťahu človeka ku krajine, nie iba o bod na mape.",
    ],
    qrNote:
      "Toto zastavenie je dobrý kandidát na kombináciu textu, staršej fotografie a bezpečnostnej poznámky k pohybu v teréne.",
    mapPosition: { top: "35%", left: "41%" },
    order: 3,
  },
];

export function getStop(slug: string) {
  return stops.find((stop) => stop.slug === slug);
}

export function getRoute(slug: string) {
  return routes.find((route) => route.slug === slug);
}

export function getStopsForRoute(route: Route) {
  return route.stopSlugs
    .map((slug) => getStop(slug))
    .filter((stop): stop is Stop => Boolean(stop))
    .sort((a, b) => a.order - b.order);
}
