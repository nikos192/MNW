import { BRAND_EMAIL } from "@/lib/brand";

export type CatalogImage = {
  url: string;
  alt: string;
};

export type WheelFinish = {
  name: string;
  swatch: string;
};

export type WheelSpec = {
  label: string;
  value: string;
};

export type CatalogProduct = {
  id: string;
  handle: string;
  title: string;
  series: string;
  shortDescription: string;
  description: string;
  price: string;
  leadTime: string;
  images: CatalogImage[];
  finishes: WheelFinish[];
  specs: WheelSpec[];
  diameterOptions: string[];
  widthOptions: string[];
  pcdOptions: string[];
  offsetRange: string;
  centreboreOptions: string[];
};

export type DeliveredSet = {
  chassis: string;
  fitment: string;
  finish: string;
  note: string;
  image: string;
};

export type ProcessStep = {
  title: string;
  copy: string;
};

export type FinishProgram = {
  title: string;
  overline: string;
  copy: string;
};

export type DealerRegion = {
  region: string;
  city: string;
  note: string;
  contact: string;
};

export type CollectionSummary = {
  slug: "monoblock" | "multi-piece";
  label: string;
  title: string;
  description: string;
  handles: string[];
};

function yr(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

export const vehicleData: Record<string, Record<string, number[]>> = {
  BMW: {
    // 1 Series
    "1 Series E87": yr(2004, 2011),
    "1 Series F20": yr(2011, 2019),
    "1 Series F40": yr(2019, 2024),
    // 2 Series
    "2 Series F22 Coupe": yr(2014, 2021),
    "2 Series G42 Coupe": yr(2021, 2024),
    "2 Series F44 Gran Coupe": yr(2019, 2024),
    // 3 Series
    "3 Series E46": yr(1998, 2006),
    "3 Series E90": yr(2005, 2012),
    "3 Series F30": yr(2012, 2019),
    "3 Series G20": yr(2019, 2024),
    // 4 Series
    "4 Series F32": yr(2013, 2020),
    "4 Series G22": yr(2020, 2024),
    // 5 Series
    "5 Series E60": yr(2003, 2010),
    "5 Series F10": yr(2010, 2016),
    "5 Series G30": yr(2016, 2023),
    "5 Series G60": yr(2023, 2024),
    // 6 Series
    "6 Series E63": yr(2003, 2010),
    "6 Series F12/F13": yr(2011, 2018),
    // 7 Series
    "7 Series E65": yr(2001, 2008),
    "7 Series F01": yr(2008, 2015),
    "7 Series G11": yr(2015, 2022),
    "7 Series G70": yr(2022, 2024),
    // 8 Series
    "8 Series E31": yr(1990, 1999),
    "8 Series G14/G15": yr(2018, 2024),
    // M2
    "M2 F87": yr(2016, 2021),
    "M2 G87": yr(2022, 2024),
    // M3
    "M3 E46": yr(2000, 2006),
    "M3 E90/E92/E93": yr(2007, 2013),
    "M3 F80": yr(2014, 2018),
    "M3 G80": yr(2021, 2024),
    // M4
    "M4 F82": yr(2014, 2020),
    "M4 G82": yr(2021, 2024),
    // M5
    "M5 E60": yr(2004, 2010),
    "M5 F10": yr(2011, 2017),
    "M5 F90": yr(2018, 2024),
    // M6
    "M6 E63": yr(2005, 2010),
    "M6 F12/F13": yr(2012, 2018),
    // M8
    "M8 G14/G15": yr(2019, 2024),
    // X Series
    "X1 F48": yr(2015, 2022),
    "X1 U11": yr(2022, 2024),
    "X2 F39": yr(2018, 2024),
    "X3 E83": yr(2003, 2010),
    "X3 F25": yr(2010, 2017),
    "X3 G01": yr(2017, 2024),
    "X3 M F97": yr(2019, 2024),
    "X4 F26": yr(2014, 2018),
    "X4 G02": yr(2018, 2024),
    "X4 M F98": yr(2019, 2024),
    "X5 E53": yr(1999, 2006),
    "X5 E70": yr(2006, 2013),
    "X5 F15": yr(2013, 2018),
    "X5 G05": yr(2018, 2024),
    "X5 M F85": yr(2015, 2018),
    "X5 M F95": yr(2019, 2024),
    "X6 E71": yr(2008, 2014),
    "X6 F16": yr(2014, 2019),
    "X6 G06": yr(2019, 2024),
    "X6 M F86": yr(2015, 2018),
    "X6 M F96": yr(2020, 2024),
    "X7 G07": yr(2018, 2024),
    // Z / i
    "Z4 E85/E86": yr(2002, 2008),
    "Z4 E89": yr(2008, 2016),
    "Z4 G29": yr(2018, 2024),
    "i4 G26": yr(2021, 2024),
    "i5 G60": yr(2023, 2024),
    "i7 G70": yr(2022, 2024),
  },

  Audi: {
    // A1
    "A1 8X": yr(2010, 2018),
    "A1 GB": yr(2018, 2024),
    // A3 / S3 / RS3
    "A3 8P": yr(2003, 2012),
    "A3 8V": yr(2012, 2020),
    "A3 8Y": yr(2020, 2024),
    "S3 8P": yr(2006, 2012),
    "S3 8V": yr(2013, 2020),
    "S3 8Y": yr(2020, 2024),
    "RS3 8V": yr(2015, 2020),
    "RS3 8Y": yr(2021, 2024),
    // A4 / S4 / RS4
    "A4 B6": yr(2000, 2004),
    "A4 B7": yr(2004, 2008),
    "A4 B8": yr(2008, 2015),
    "A4 B9": yr(2015, 2024),
    "S4 B8": yr(2008, 2015),
    "S4 B9": yr(2017, 2024),
    "RS4 B7": yr(2006, 2008),
    "RS4 B8": yr(2012, 2015),
    "RS4 B9": yr(2017, 2024),
    // A5 / S5 / RS5
    "A5 B8": yr(2007, 2016),
    "A5 B9": yr(2016, 2024),
    "S5 B8": yr(2007, 2016),
    "S5 B9": yr(2016, 2024),
    "RS5 B8": yr(2010, 2016),
    "RS5 B9": yr(2017, 2024),
    // A6 / S6 / RS6
    "A6 C6": yr(2004, 2011),
    "A6 C7": yr(2011, 2018),
    "A6 C8": yr(2018, 2024),
    "S6 C7": yr(2012, 2018),
    "S6 C8": yr(2019, 2024),
    "RS6 C5": yr(2002, 2004),
    "RS6 C6": yr(2008, 2010),
    "RS6 C7": yr(2013, 2018),
    "RS6 C8": yr(2019, 2024),
    // A7 / S7 / RS7
    "A7 C7": yr(2010, 2018),
    "A7 C8": yr(2018, 2024),
    "S7 C7": yr(2012, 2018),
    "S7 C8": yr(2019, 2024),
    "RS7 C7": yr(2013, 2018),
    "RS7 C8": yr(2019, 2024),
    // A8 / S8
    "A8 D3": yr(2002, 2009),
    "A8 D4": yr(2009, 2017),
    "A8 D5": yr(2017, 2024),
    "S8 D4": yr(2012, 2017),
    "S8 D5": yr(2019, 2024),
    // Q Series
    "Q2 GA": yr(2016, 2024),
    "Q3 8U": yr(2011, 2018),
    "Q3 F3": yr(2018, 2024),
    "RS Q3 F3": yr(2019, 2024),
    "Q5 8R": yr(2008, 2017),
    "Q5 FY": yr(2017, 2024),
    "SQ5 8R": yr(2012, 2017),
    "SQ5 FY": yr(2017, 2024),
    "Q7 4L": yr(2005, 2015),
    "Q7 4M": yr(2015, 2024),
    "SQ7 4M": yr(2016, 2024),
    "Q8 4MN": yr(2018, 2024),
    "SQ8 4MN": yr(2019, 2024),
    "RS Q8 4MN": yr(2019, 2024),
    // R8 / TT
    "R8 V8 Gen1": yr(2006, 2015),
    "R8 V10 Gen2": yr(2015, 2024),
    "TT 8N": yr(1998, 2006),
    "TT 8J": yr(2006, 2014),
    "TT 8S": yr(2014, 2023),
    "TTS 8J": yr(2008, 2014),
    "TTS 8S": yr(2014, 2023),
    "TT RS 8J": yr(2009, 2014),
    "TT RS 8S": yr(2016, 2023),
  },

  Mercedes: {
    // A-Class / A45 AMG
    "A-Class W176": yr(2012, 2018),
    "A-Class W177": yr(2018, 2024),
    "A45 AMG W176": yr(2013, 2018),
    "A45 S AMG W177": yr(2020, 2024),
    // CLA
    "CLA C117": yr(2013, 2019),
    "CLA C118": yr(2019, 2024),
    "CLA 45 AMG C117": yr(2014, 2019),
    "CLA 45 S AMG C118": yr(2020, 2024),
    // C-Class
    "C-Class W203": yr(2000, 2007),
    "C-Class W204": yr(2007, 2014),
    "C-Class W205": yr(2014, 2021),
    "C-Class W206": yr(2021, 2024),
    "C43 AMG W205": yr(2016, 2021),
    "C43 AMG W206": yr(2022, 2024),
    "C63 AMG W204": yr(2008, 2014),
    "C63 AMG W205": yr(2014, 2021),
    "C63 S AMG W205": yr(2015, 2021),
    "C63 S AMG W206": yr(2022, 2024),
    // E-Class
    "E-Class W211": yr(2002, 2009),
    "E-Class W212": yr(2009, 2016),
    "E-Class W213": yr(2016, 2024),
    "E43 AMG W213": yr(2017, 2018),
    "E53 AMG W213": yr(2019, 2024),
    "E63 AMG W212": yr(2009, 2016),
    "E63 S AMG W213": yr(2016, 2024),
    // S-Class
    "S-Class W221": yr(2005, 2013),
    "S-Class W222": yr(2013, 2020),
    "S-Class W223": yr(2020, 2024),
    "S63 AMG W222": yr(2013, 2020),
    "S63 AMG W223": yr(2021, 2024),
    // G-Class
    "G-Class W463": yr(2012, 2018),
    "G-Class W464": yr(2018, 2024),
    "G63 AMG W463": yr(2012, 2018),
    "G63 AMG W464": yr(2018, 2024),
    // GLC / GLE
    "GLC X253": yr(2015, 2022),
    "GLC X254": yr(2022, 2024),
    "GLC 63 AMG X253": yr(2017, 2022),
    "GLE W166": yr(2015, 2019),
    "GLE W167": yr(2019, 2024),
    "GLE 63 AMG W166": yr(2015, 2019),
    "GLE 63 S AMG W167": yr(2020, 2024),
    // AMG GT / SL
    "AMG GT C190": yr(2015, 2024),
    "AMG GT 4-Door X290": yr(2018, 2024),
    "SL R231": yr(2012, 2021),
    "SL R232": yr(2021, 2024),
  },

  Volkswagen: {
    // Golf generations
    "Golf Mk4": yr(1997, 2004),
    "Golf Mk5": yr(2003, 2009),
    "Golf Mk6": yr(2008, 2013),
    "Golf Mk7": yr(2012, 2019),
    "Golf Mk8": yr(2019, 2024),
    "Golf GTI Mk5": yr(2004, 2009),
    "Golf GTI Mk6": yr(2009, 2013),
    "Golf GTI Mk7": yr(2013, 2020),
    "Golf GTI Mk8": yr(2021, 2024),
    "Golf R Mk6": yr(2010, 2013),
    "Golf R Mk7": yr(2013, 2018),
    "Golf R Mk7.5": yr(2017, 2019),
    "Golf R Mk8": yr(2021, 2024),
    // Other VW
    "Polo GTI 6C": yr(2014, 2017),
    "Polo GTI AW": yr(2017, 2024),
    "Scirocco 13": yr(2008, 2017),
    "Arteon 3H": yr(2017, 2024),
    "Tiguan R": yr(2021, 2024),
    "Passat B7": yr(2010, 2014),
    "Passat B8": yr(2014, 2024),
  },

  Porsche: {
    // 911 (992)
    "911 Carrera 992": yr(2019, 2024),
    "911 Carrera S 992": yr(2019, 2024),
    "911 Carrera 4S 992": yr(2019, 2024),
    "911 GT3 992": yr(2021, 2024),
    "911 GT3 RS 992": yr(2022, 2024),
    "911 Turbo S 992": yr(2020, 2024),
    // 911 (991)
    "911 Carrera 991": yr(2011, 2019),
    "911 Carrera S 991": yr(2011, 2019),
    "911 GT3 991": yr(2013, 2019),
    "911 GT3 RS 991": yr(2015, 2020),
    "911 Turbo S 991": yr(2013, 2019),
    // 911 (997)
    "911 Carrera 997": yr(2004, 2012),
    "911 GT3 997": yr(2006, 2012),
    "911 GT3 RS 997": yr(2006, 2012),
    "911 Turbo 997": yr(2006, 2012),
    // 718
    "718 Cayman": yr(2016, 2024),
    "718 Cayman S": yr(2016, 2024),
    "718 Cayman GT4": yr(2019, 2024),
    "718 Cayman GT4 RS": yr(2021, 2024),
    "718 Boxster": yr(2016, 2024),
    "718 Boxster S": yr(2016, 2024),
    "718 Spyder": yr(2019, 2024),
    // Cayman / Boxster (981)
    "Cayman GT4 981": yr(2015, 2016),
    "Boxster Spyder 981": yr(2015, 2016),
    // Cayenne / Macan / Panamera
    "Cayenne 92A": yr(2010, 2017),
    "Cayenne 9YA": yr(2018, 2024),
    "Cayenne GTS 9YA": yr(2020, 2024),
    "Cayenne Turbo 9YA": yr(2018, 2024),
    "Macan 95B": yr(2014, 2023),
    "Panamera 970": yr(2009, 2016),
    "Panamera 971": yr(2016, 2024),
    "Panamera Turbo S 971": yr(2017, 2024),
    "Taycan": yr(2019, 2024),
  },

  Nissan: {
    "GT-R R35": yr(2007, 2024),
    "350Z Z33": yr(2002, 2009),
    "370Z Z34": yr(2008, 2021),
    "400Z / Z RZ34": yr(2022, 2024),
  },

  Toyota: {
    "GR Supra A90": yr(2019, 2024),
    "86 / GT86 ZN6": yr(2012, 2021),
    "GR86 ZN8": yr(2021, 2024),
    "GR Yaris GXPA16": yr(2020, 2024),
    "Camry XV70": yr(2017, 2024),
    "GR Corolla": yr(2022, 2024),
  },

  Subaru: {
    "WRX STI GD": yr(2001, 2007),
    "WRX STI GR/GV": yr(2007, 2014),
    "WRX STI VA": yr(2014, 2021),
    "WRX VB": yr(2022, 2024),
    "BRZ ZC6": yr(2012, 2021),
    "BRZ ZD8": yr(2021, 2024),
    "Forester SH": yr(2008, 2013),
    "Forester SK": yr(2018, 2024),
  },

  Honda: {
    "Civic Type R FK2": yr(2015, 2017),
    "Civic Type R FK8": yr(2017, 2021),
    "Civic Type R FL5": yr(2022, 2024),
    "Integra Type R DC2": yr(1995, 2001),
    "Integra Type R DC5": yr(2001, 2006),
    "NSX NC1": yr(2016, 2022),
    "S2000 AP1/AP2": yr(1999, 2009),
  },

  Ford: {
    "Mustang S550": yr(2015, 2023),
    "Mustang S650": yr(2023, 2024),
    "Mustang GT500 S550": yr(2019, 2023),
    "Focus RS Mk3": yr(2016, 2018),
    "Falcon FG X": yr(2014, 2016),
    "Falcon GT": yr(2014, 2016),
  },

  Chevrolet: {
    "Corvette C7": yr(2013, 2019),
    "Corvette Z06 C7": yr(2015, 2019),
    "Corvette C8": yr(2020, 2024),
    "Corvette Z06 C8": yr(2022, 2024),
    "Camaro ZL1": yr(2017, 2024),
  },

  Lamborghini: {
    "Huracán LP610-4": yr(2014, 2019),
    "Huracán EVO": yr(2019, 2024),
    "Huracán Performante": yr(2017, 2021),
    "Huracán STO": yr(2020, 2024),
    "Urus": yr(2018, 2024),
    "Urus Performante": yr(2022, 2024),
    "Gallardo": yr(2003, 2013),
    "Aventador SVJ": yr(2018, 2022),
  },

  Ferrari: {
    "488 GTB": yr(2015, 2020),
    "488 Pista": yr(2018, 2020),
    "F8 Tributo": yr(2019, 2024),
    "F8 Spider": yr(2019, 2024),
    "SF90 Stradale": yr(2020, 2024),
    "Roma": yr(2020, 2024),
    "Purosangue": yr(2022, 2024),
    "296 GTB": yr(2022, 2024),
    "812 Superfast": yr(2017, 2022),
    "F430": yr(2004, 2009),
    "458 Italia": yr(2009, 2015),
  },

  McLaren: {
    "570S": yr(2015, 2022),
    "600LT": yr(2018, 2020),
    "620R": yr(2020, 2022),
    "720S": yr(2017, 2023),
    "765LT": yr(2020, 2023),
    "GT": yr(2019, 2024),
    "Artura": yr(2022, 2024),
    "750S": yr(2023, 2024),
  },

  "Alfa Romeo": {
    "Giulia Quadrifoglio": yr(2016, 2024),
    "Stelvio Quadrifoglio": yr(2017, 2024),
    "Giulia Ti": yr(2016, 2024),
    "4C": yr(2013, 2020),
  },

  Lexus: {
    "IS300 XE30": yr(2013, 2024),
    "IS350 XE30": yr(2013, 2024),
    "IS500 XE30": yr(2021, 2024),
    "RC F": yr(2014, 2024),
    "LC500": yr(2017, 2024),
    "GS F": yr(2015, 2020),
    "LFA": yr(2010, 2012),
  },

  "Holden / HSV": {
    "Commodore VF": yr(2013, 2017),
    "Commodore ZB": yr(2017, 2020),
    "HSV GTS Gen F": yr(2013, 2017),
    "HSV GTSR W1": yr(2017, 2017),
    "Camaro 6th Gen": yr(2018, 2024),
  },
};

export const defaultMediaImage = "/media/hero-wheel-poster.jpg";

const DIAMETERS_1PC = ["15\"", "16\"", "17\"", "18\"", "19\"", "20\"", "21\"", "22\"", "23\"", "24\""];
const DIAMETERS_2PC = ["18\"", "19\"", "20\"", "21\"", "22\"", "23\"", "24\""];
const WIDTHS_1PC = ["6.0\"", "6.5\"", "7.0\"", "7.5\"", "8.0\"", "8.5\"", "9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\""];
const WIDTHS_2PC = ["8.0\"", "8.5\"", "9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\"", "12.5\"", "13.0\"", "13.5\""];
const PCDS = ["4x100", "4x108", "5x100", "5x108", "5x112", "5x114.3", "5x120", "5x130", "Centre lock"];
const CENTREBORES = ["54.1mm", "56.6mm", "57.1mm", "60.1mm", "63.4mm", "66.6mm", "67.1mm", "72.6mm", "73.1mm", "74.1mm", "77.0mm"];

export const fallbackProducts: CatalogProduct[] = [
  {
    id: "mnw-01",
    handle: "mnw-01",
    title: "MonzaWheels-01",
    series: "1-Piece Forged",
    shortDescription:
      "A measured face with enough edge definition to carry luxury and performance builds without visual noise.",
    description:
      "MonzaWheels-01 is the calmest entry in the range. It suits sedans and coupes that need a deliberate surface, exact brake clearance, and a finish program that stays restrained rather than loud. Available from 15 to 24 inches with fitment resolved per chassis.",
    price: "From $588/wheel",
    leadTime: "8–12 weeks",
    images: [
      { url: defaultMediaImage, alt: "MonzaWheels-01 forged wheel" },
      { url: defaultMediaImage, alt: "MonzaWheels-01 alternate angle" },
      { url: defaultMediaImage, alt: "MonzaWheels-01 profile" },
      { url: defaultMediaImage, alt: "MonzaWheels-01 detail" },
    ],
    finishes: [
      { name: "Brushed clear", swatch: "#AFAFAD" },
      { name: "Satin graphite", swatch: "#2A2A2A" },
      { name: "Gloss black", swatch: "#0F0F0F" },
    ],
    specs: [
      { label: "Construction", value: "1-piece forged monoblock" },
      { label: "Material", value: "6061-T6 aluminium billet" },
      { label: "Diameter range", value: "15 to 24 inches" },
      { label: "Width range", value: "6.0 to 12.0 inches" },
      { label: "PCD", value: "Matched to vehicle — full range available" },
      { label: "Offset", value: "Resolved per chassis" },
    ],
    diameterOptions: DIAMETERS_1PC,
    widthOptions: WIDTHS_1PC,
    pcdOptions: PCDS,
    offsetRange: "Resolved per chassis",
    centreboreOptions: CENTREBORES,
  },
  {
    id: "mnw-02",
    handle: "mnw-02",
    title: "MonzaWheels-02",
    series: "1-Piece Forged",
    shortDescription:
      "Sharper spoke architecture for builds that need obvious brake presence and more motorsport tension in the face.",
    description:
      "MonzaWheels-02 pushes the spoke architecture harder. It works best around aggressive brake packages, staggered fitment, and projects where the wheel needs more tension without tipping into visual clutter. Available from 15 to 24 inches.",
    price: "From $588/wheel",
    leadTime: "8–12 weeks",
    images: [
      { url: defaultMediaImage, alt: "MonzaWheels-02 forged wheel" },
      { url: defaultMediaImage, alt: "MonzaWheels-02 alternate angle" },
      { url: defaultMediaImage, alt: "MonzaWheels-02 profile" },
      { url: defaultMediaImage, alt: "MonzaWheels-02 detail" },
    ],
    finishes: [
      { name: "Gloss black", swatch: "#0F0F0F" },
      { name: "Machine face", swatch: "#F5F5F3" },
      { name: "Satin graphite", swatch: "#2A2A2A" },
    ],
    specs: [
      { label: "Construction", value: "1-piece forged monoblock" },
      { label: "Material", value: "6061-T6 aluminium billet" },
      { label: "Diameter range", value: "15 to 24 inches" },
      { label: "Width range", value: "6.0 to 12.0 inches" },
      { label: "PCD", value: "Matched to vehicle — full range available" },
      { label: "Offset", value: "Brake package dependent" },
    ],
    diameterOptions: DIAMETERS_1PC,
    widthOptions: WIDTHS_1PC,
    pcdOptions: PCDS,
    offsetRange: "Brake package dependent",
    centreboreOptions: CENTREBORES,
  },
  {
    id: "mnw-03",
    handle: "mnw-03",
    title: "MonzaWheels-03",
    series: "2-Piece Forged",
    shortDescription:
      "A stronger concave language suited to hero builds where the wheel is part of the car's visual signature.",
    description:
      "MonzaWheels-03 is the deeper, more dramatic base in a two-piece forged format. The split construction allows the inner barrel to be configured independently, unlocking more aggressive offsets and deeper dish profiles. Available from 18 to 24 inches.",
    price: "From $780/wheel",
    leadTime: "10–14 weeks",
    images: [
      { url: defaultMediaImage, alt: "MonzaWheels-03 forged wheel" },
      { url: defaultMediaImage, alt: "MonzaWheels-03 alternate angle" },
      { url: defaultMediaImage, alt: "MonzaWheels-03 profile" },
      { url: defaultMediaImage, alt: "MonzaWheels-03 detail" },
    ],
    finishes: [
      { name: "Brushed clear", swatch: "#AFAFAD" },
      { name: "Machine face", swatch: "#F5F5F3" },
      { name: "Gloss black", swatch: "#0F0F0F" },
      { name: "Colour by brief", swatch: "#B08B57" },
    ],
    specs: [
      { label: "Construction", value: "2-piece forged — centre & barrel" },
      { label: "Material", value: "6061-T6 aluminium billet" },
      { label: "Diameter range", value: "18 to 24 inches" },
      { label: "Width range", value: "8.0 to 13.5 inches" },
      { label: "PCD", value: "Matched to vehicle — full range available" },
      { label: "Offset", value: "Extended range — resolved per chassis" },
    ],
    diameterOptions: DIAMETERS_2PC,
    widthOptions: WIDTHS_2PC,
    pcdOptions: PCDS,
    offsetRange: "Extended range — resolved per chassis",
    centreboreOptions: CENTREBORES,
  },
  {
    id: "mnw-04",
    handle: "mnw-04",
    title: "MonzaWheels-04",
    series: "2-Piece Forged",
    shortDescription:
      "The most aggressive two-piece program — deep dish, bold hardware, and a face built for maximum visual impact.",
    description:
      "MonzaWheels-04 is built for the builds that demand the most. The two-piece forged construction goes deeper, hardware is exposed as a design element, and the face is engineered around maximum dish and statement fitment. Available from 18 to 24 inches.",
    price: "From $840/wheel",
    leadTime: "10–14 weeks",
    images: [
      { url: defaultMediaImage, alt: "MonzaWheels-04 forged wheel" },
      { url: defaultMediaImage, alt: "MonzaWheels-04 alternate angle" },
      { url: defaultMediaImage, alt: "MonzaWheels-04 profile" },
      { url: defaultMediaImage, alt: "MonzaWheels-04 detail" },
    ],
    finishes: [
      { name: "Gloss black", swatch: "#0F0F0F" },
      { name: "Satin graphite", swatch: "#2A2A2A" },
      { name: "Brushed clear", swatch: "#AFAFAD" },
      { name: "Colour by brief", swatch: "#B08B57" },
    ],
    specs: [
      { label: "Construction", value: "2-piece forged — centre & barrel" },
      { label: "Material", value: "6061-T6 aluminium billet" },
      { label: "Diameter range", value: "18 to 24 inches" },
      { label: "Width range", value: "8.0 to 13.5 inches" },
      { label: "PCD", value: "Matched to vehicle — full range available" },
      { label: "Offset", value: "Maximum dish — resolved per chassis" },
    ],
    diameterOptions: DIAMETERS_2PC,
    widthOptions: WIDTHS_2PC,
    pcdOptions: PCDS,
    offsetRange: "Maximum dish — resolved per chassis",
    centreboreOptions: CENTREBORES,
  },
];

export const deliveredSets: DeliveredSet[] = [
  {
    chassis: "BMW G80 M3",
    fitment: "19x9.5 / 20x10.5",
    finish: "Brushed clear with machined cap",
    note: "Reference build for a restrained staggered street setup.",
    image: defaultMediaImage,
  },
  {
    chassis: "Porsche 992 Carrera",
    fitment: "20x9 / 21x11.5",
    finish: "Satin graphite with hidden hardware",
    note: "Illustrates how the same face tightens up when the rear architecture gets more aggressive.",
    image: defaultMediaImage,
  },
  {
    chassis: "Audi RS3 8Y",
    fitment: "19x9 square",
    finish: "Gloss black with machine lip",
    note: "Proof point for a compact chassis with brake-clearance priorities.",
    image: defaultMediaImage,
  },
];

export const fitmentPrinciples = [
  {
    title: "Chassis first",
    copy: "Width, offset, bore, and brake clearance are resolved around the exact vehicle before the wheel moves into production.",
  },
  {
    title: "No shelf offsets",
    copy: "The catalogue is a design direction, not a locked inventory system. Final geometry is approved as part of the brief.",
  },
  {
    title: "Made to order",
    copy: "Each set moves into machining, finishing, and final approval only after the vehicle and finish direction are signed off.",
  },
];

export const aboutStatements = [
  {
    title: "Designed in Australia",
    copy: "MonzaWheels is built around a simple idea: the wheel should feel native to the chassis rather than adapted after the fact.",
  },
  {
    title: "Forged, not generic",
    copy: "Every program starts from a forged blank and ends with a fitment, face, and finish combination approved for the exact build.",
  },
  {
    title: "Quote-first process",
    copy: "This is a configure-to-order product. The right outcome comes from the brief, not from forcing a generic cart flow onto a custom part.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Brief",
    copy: "Vehicle, brake package, ride height, and finish direction are locked before geometry is approved.",
  },
  {
    title: "Engineering",
    copy: "Offsets, bores, spoke clearance, and load path are resolved around the exact chassis rather than a generic shelf fitment.",
  },
  {
    title: "Machining",
    copy: "Each face starts from a forged 6061-T6 billet and moves through machining only after the brief is signed off.",
  },
  {
    title: "Finish",
    copy: "Surface treatment and final detailing are chosen as part of the same program, not added as an afterthought.",
  },
];

export const finishPrograms: FinishProgram[] = [
  {
    title: "Brushed Clear",
    overline: "Finish Program 01",
    copy: "A cool silver read that keeps spoke geometry crisp without pulling attention away from the chassis.",
  },
  {
    title: "Satin Graphite",
    overline: "Finish Program 02",
    copy: "The most restrained surface in the range. It works when the wheel needs to sit inside the car rather than on top of it.",
  },
  {
    title: "Gloss Black",
    overline: "Finish Program 03",
    copy: "High contrast and deliberate. Best used where negative space and brake presence are part of the visual brief.",
  },
];

export const dealerRegions: DealerRegion[] = [
  {
    region: "Australia",
    city: "Brisbane",
    note: "Direct quoting, chassis reviews, and finish consultations from the MonzaWheels workshop.",
    contact: BRAND_EMAIL,
  },
  {
    region: "Europe",
    city: "Partner network forming",
    note: "Send the vehicle brief and we will route the project to the closest fitment partner as the network expands.",
    contact: BRAND_EMAIL,
  },
  {
    region: "Asia Pacific",
    city: "By appointment",
    note: "Remote quoting and logistics support for projects outside Brisbane while the dealer footprint grows.",
    contact: BRAND_EMAIL,
  },
];

export const collectionSummaries: CollectionSummary[] = [
  {
    slug: "monoblock",
    label: "1-Piece Forged",
    title: "Monoblock",
    description: "Single-piece forged faces for cleaner chassis, tighter proportions, and the most direct visual read. Available 15–24 inches.",
    handles: ["mnw-01", "mnw-02"],
  },
  {
    slug: "multi-piece",
    label: "2-Piece Forged",
    title: "Multi-Piece",
    description: "Two-piece forged construction for deeper dish, extended offsets, and a stronger statement on hero builds. Available 18–24 inches.",
    handles: ["mnw-03", "mnw-04"],
  },
];
