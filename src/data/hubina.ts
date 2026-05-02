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
  markerOffset?: {
    x: string;
    y: string;
  };
  markerLabel?: string;
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

const firstCircleStops = ["krizova-cesta-kaplnka", "skalka", "stary-kamenolom"];

const bigCircleStops = [
  "kostol",
  "krizova-cesta-kaplnka",
  "skalka",
  "stary-kamenolom",
  "grnica",
  "gonove-lazy",
  "rozhladna-marhat",
  "dolnosokolske-jaskyne",
  "pamatnik-vlada-plulika",
  "visiace-skaly",
];

export const routes: Route[] = [
  {
    slug: "hubina-vyhlady",
    name: "Výhľady nad Hubinou",
    subtitle: "Kratší pracovný okruh",
    distance: "cca 5-7 km",
    duration: "2-3 h",
    difficulty: "stredná",
    description:
      "Kratší okruh z obce smerom ku krížovej ceste, Skalke a starému kameňolomu. Slúži ako prvá testovacia trasa pre QR zastavenia.",
    stopSlugs: firstCircleStops,
  },
  {
    slug: "velky-okruh",
    name: "Veľký okruh Hubinou",
    subtitle: "Návrh podľa mapového podkladu",
    distance: "cca 17-20 km",
    duration: "5-7 h",
    difficulty: "náročná",
    description:
      "Dlhšia turistická verzia s výhľadmi, prírodnými bodmi, Marhátom, pamätníkom a jaskyňami. Bude vhodná pre návštevníkov, ktorí chcú prejsť celý hrebeňový okruh.",
    stopSlugs: bigCircleStops,
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
    stopSlugs: ["kostol"],
  },
];

export const stops: Stop[] = [
  {
    slug: "kostol",
    name: "Kostol",
    type: "prakticke",
    routeSlug: "centrum-a-pribehy",
    shortDescription:
      "Východiskový bod v obci, vhodný ako orientačný začiatok kratších aj dlhších okruhov.",
    story: [
      "Kostol slúži v pracovnej mape ako praktický orientačný bod priamo v obci.",
      "Vo finálnej verzii sem môžeme doplniť krátky opis miesta, historický kontext a odporúčanie, kadiaľ sa napojiť na trasu.",
    ],
    qrNote:
      "Tento bod môže fungovať ako úvodný QR kód pre návštevníkov, ktorí začínajú priamo v obci.",
    mapPosition: { top: "27.8%", left: "24.1%" },
    markerOffset: { x: "-16px", y: "12px" },
    markerLabel: "START",
    order: 1,
  },
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
    mapPosition: { top: "25.4%", left: "25.1%" },
    markerOffset: { x: "18px", y: "-10px" },
    order: 2,
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
    mapPosition: { top: "19.5%", left: "33.0%" },
    markerOffset: { x: "12px", y: "10px" },
    order: 3,
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
    mapPosition: { top: "16.3%", left: "31.9%" },
    markerOffset: { x: "-12px", y: "-12px" },
    order: 4,
  },
  {
    slug: "gonove-lazy",
    name: "Cyklisticky razcestnik Gonove lazy",
    type: "pribeh",
    routeSlug: "velky-okruh",
    shortDescription:
      "Laznícka krajina nad Hubinou, kde sa dá rozprávať o staršom osídlení, hospodárení a živote mimo centra obce.",
    story: [
      "Gonove lazy sú vhodné zastavenie na vysvetlenie toho, ako krajina nad Hubinou kedysi fungovala ako priestor práce, bývania a presunov.",
      "V ďalšej fáze sem môžeme doplniť spomienky miestnych, staré názvy lúk a lazov alebo fotografie, ktoré ukážu rozdiel medzi dnešným a niekdajším využívaním krajiny.",
      "Tento bod môže byť pokojnejším prechodom medzi obcou a výraznejšími prírodnými miestami na hrebeni.",
    ],
    qrNote:
      "QR stránka môže slúžiť ako krátke vysvetlenie lazníckej krajiny a starých miestnych názvov.",
    mapPosition: { top: "27.7%", left: "64.0%" },
    order: 6,
  },
  {
    slug: "grnica",
    name: "Grnica",
    type: "vyhlad",
    routeSlug: "velky-okruh",
    shortDescription:
      "Výrazný bod na trase s výškou približne 522 m, vhodný na orientáciu v širšej krajine nad Hubinou.",
    story: [
      "Grnica je bod, ktorý na mapovom podklade prirodzene vystupuje ako orientačné miesto veľkého okruhu.",
      "Na stránke môže byť neskôr doplnený opis výhľadov, smerov a nadväzujúcich turistických chodníkov, aby sa návštevník v teréne lepšie zorientoval.",
      "Zastavenie môže fungovať ako krátka pauza medzi úvodnou časťou nad obcou a dlhším prechodom smerom k ďalším bodom.",
    ],
    qrNote:
      "Po doplnení GPS bodu tu môže byť aj krátka orientačná mapa alebo zoznam viditeľných smerov.",
    mapPosition: { top: "18.8%", left: "49.0%" },
    order: 5,
  },
  {
    slug: "visiace-skaly",
    name: "Visiace skaly",
    type: "priroda",
    routeSlug: "velky-okruh",
    shortDescription:
      "Prírodný skalný bod na trase, vhodný na krátke vysvetlenie geológie a opatrného pohybu v teréne.",
    story: [
      "Visiace skaly môžu byť jedným z najvýraznejších prírodných zastavení veľkého okruhu.",
      "Obsah stránky by mal neskôr vysvetliť, čím je miesto zaujímavé, ako vznikal skalný reliéf a ako sa pri takýchto miestach správať bezpečne a ohľaduplne.",
      "Pri tomto bode sa hodí doplniť aj fotografiu priamo z terénu, pretože názov aj miesto budú pre návštevníka silno vizuálne.",
    ],
    qrNote:
      "Tu sa oplatí pridať bezpečnostnú poznámku a upozorniť, že návštevník nemá schádzať mimo chodníka.",
    mapPosition: { top: "86.5%", left: "71.8%" },
    markerLabel: "CIEĽ",
    order: 10,
  },
  {
    slug: "rozhladna-marhat",
    name: "Rozhľadňa Marhát",
    type: "vyhlad",
    routeSlug: "velky-okruh",
    shortDescription:
      "Dominantný výhľadový cieľ veľkého okruhu, jeden z najsilnejších bodov celej trasy.",
    story: [
      "Rozhľadňa Marhát je prirodzený vrcholový cieľ, ktorý dáva veľkému okruhu jasný zmysel a odmenu po výstupe.",
      "Na detailnej stránke môže byť neskôr panoramatický opis výhľadov, odporúčanie na zastavenie a praktická informácia o náročnosti prístupu.",
      "Toto zastavenie by malo byť medzi hlavnými QR bodmi, pretože návštevník tu pravdepodobne strávi viac času a bude hľadať kontext k okolitej krajine.",
    ],
    qrNote:
      "QR obsah môže obsahovať orientačný opis panorámy a odkazy na ďalšie body v okolí.",
    mapPosition: { top: "67.0%", left: "89.0%" },
    order: 7,
  },
  {
    slug: "pamatnik-vlada-plulika",
    name: "Pamätník Vlada Plulíka",
    type: "pribeh",
    routeSlug: "velky-okruh",
    shortDescription:
      "Pamätné miesto na trase, vhodné na citlivé spracovanie osobného príbehu a lokálnej pamäti.",
    story: [
      "Pamätník Vlada Plulíka by mal byť spracovaný citlivo, vecne a s rešpektom k človeku aj miestu.",
      "V pracovnej verzii nechávame text otvorený, kým doplníme presné informácie, rok, súvislosti a prípadne zdroj overených údajov.",
      "Takéto zastavenie môže návštevníkovi pripomenúť, že turistická trasa nie je len príroda, ale aj pamäť ľudí, udalostí a vzťahov ku krajine.",
    ],
    qrNote:
      "Pred finálnym publikovaním tu bude dobré overiť text s dôveryhodným zdrojom alebo rodinou/obcou.",
    mapPosition: { top: "67.4%", left: "66.4%" },
    markerOffset: { x: "18px", y: "8px" },
    order: 9,
  },
  {
    slug: "dolnosokolske-jaskyne",
    name: "Veľká a Malá Dolnosokolská jaskyňa",
    type: "priroda",
    routeSlug: "velky-okruh",
    shortDescription:
      "Dvojica prírodných bodov pri trase, vhodná na vysvetlenie krasových javov a opatrného pohybu v okolí jaskýň.",
    story: [
      "Veľká a Malá Dolnosokolská jaskyňa môžu tvoriť spoločné prírodné zastavenie veľkého okruhu.",
      "Obsah by mal návštevníka upozorniť na hodnotu miesta, potrebu rešpektovať prírodu a nevstupovať tam, kde to nie je bezpečné alebo povolené.",
      "Po doplnení presných podkladov môžeme rozlíšiť obe jaskyne, pridať fotografie a krátke vysvetlenie ich geologického významu.",
    ],
    qrNote:
      "Pri jaskyniach je dôležité doplniť praktickú bezpečnostnú poznámku a jasné pravidlá správania.",
    mapPosition: { top: "65.6%", left: "65.5%" },
    markerOffset: { x: "-18px", y: "-12px" },
    order: 8,
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
