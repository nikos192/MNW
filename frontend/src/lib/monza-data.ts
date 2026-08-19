import { BRAND_EMAIL } from "@/lib/brand";
import {
  addOnRrpIncGstAudPerSet,
  priceRangeForSeries,
} from "@/lib/wheel-pricing";

export type CatalogImage = {
  url: string;
  alt: string;
};

export type WheelFinish = {
  name: string;
  swatch: string;
  image: string;
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

// VEHICLE FITMENT DATABASE
// PCD and centre bore are the key fitment specs; the diameter range is OEM-typical
// (so we don't offer undersized wheels for an M4, for example).
// Specs cross-checked against wheel-size.com, sizemywheels.com, and manufacturer data.
// Some mid/rear-engine cars (R8, Huracán, NSX) have different front/rear hub bores —
// the "X mm front / Y mm rear" notation reflects this rather than averaging.
export type VehicleFitment = {
  pcd: string;
  centreBore: string;
  minDiameter: number;
  maxDiameter: number;
};

export const vehicleFitment: Record<string, Record<string, VehicleFitment>> = {
  BMW: {
    "1 Series E87": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 19 },
    "1 Series F20": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 19 },
    "1 Series F40": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "2 Series F22 Coupe": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 20 },
    "2 Series G42 Coupe": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "2 Series F44 Gran Coupe": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "3 Series E46": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 19 },
    "3 Series E90": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 20 },
    "3 Series F30": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 20 },
    "3 Series G20": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "4 Series F32": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 20 },
    "4 Series G22": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "5 Series E60": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 20 },
    "5 Series F10": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 21 },
    "5 Series G30": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 21 },
    "5 Series G60": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "6 Series E63": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 20 },
    "6 Series F12/F13": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 21 },
    "7 Series E65": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 21 },
    "7 Series F01": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 19, maxDiameter: 21 },
    "7 Series G11": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "7 Series G70": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 22 },
    "8 Series E31": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 19 },
    "8 Series G14/G15": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "M2 F87": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 20 },
    "M2 G87": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "M3 E46": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 19 },
    "M3 E90/E92/E93": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 20 },
    "M3 F80": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 20 },
    "M3 G80": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "M4 F82": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 20 },
    "M4 G82": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "M5 E60": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 19, maxDiameter: 20 },
    "M5 F10": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 19, maxDiameter: 21 },
    "M5 F90": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "M6 E63": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 20 },
    "M6 F12/F13": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 19, maxDiameter: 21 },
    "M8 G14/G15": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "X1 F48": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 20 },
    "X1 U11": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "X2 F39": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 20 },
    "X3 E83": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 20 },
    "X3 F25": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 21 },
    "X3 G01": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 21 },
    "X3 M F97": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "X4 F26": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 21 },
    "X4 G02": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 21 },
    "X4 M F98": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "X5 E53": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 21 },
    "X5 E70": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 18, maxDiameter: 22 },
    "X5 F15": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 19, maxDiameter: 22 },
    "X5 G05": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 22 },
    "X5 M F85": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 20, maxDiameter: 22 },
    "X5 M F95": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 20, maxDiameter: 22 },
    "X6 E71": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 19, maxDiameter: 22 },
    "X6 F16": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 19, maxDiameter: 22 },
    "X6 G06": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 22 },
    "X6 M F86": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 20, maxDiameter: 22 },
    "X6 M F96": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 20, maxDiameter: 22 },
    "X7 G07": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 20, maxDiameter: 23 },
    "Z4 E85/E86": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 19 },
    "Z4 E89": { pcd: "5x120", centreBore: "72.6mm", minDiameter: 17, maxDiameter: 19 },
    "Z4 G29": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "i4 G26": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "i5 G60": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "i7 G70": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
  },

  Audi: {
    "A1 8X": { pcd: "5x100", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 18 },
    "A1 GB": { pcd: "5x100", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 18 },
    "A3 8P": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "A3 8V": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "A3 8Y": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "S3 8P": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 19 },
    "S3 8V": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 19 },
    "S3 8Y": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 19 },
    "RS3 8V": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 19 },
    "RS3 8Y": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "A4 B6": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 19 },
    "A4 B7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 19 },
    "A4 B8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 20 },
    "A4 B9": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 17, maxDiameter: 20 },
    "S4 B8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "S4 B9": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 18, maxDiameter: 20 },
    "RS4 B7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "RS4 B8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
    "RS4 B9": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 21 },
    "A5 B8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 20 },
    "A5 B9": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 17, maxDiameter: 20 },
    "S5 B8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "S5 B9": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 18, maxDiameter: 20 },
    "RS5 B8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
    "RS5 B9": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 21 },
    "A6 C6": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "A6 C7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 20 },
    "A6 C8": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 18, maxDiameter: 21 },
    "S6 C7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
    "S6 C8": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 21 },
    "RS6 C5": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 19 },
    "RS6 C6": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
    "RS6 C7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 20, maxDiameter: 21 },
    "RS6 C8": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 22 },
    "A7 C7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "A7 C8": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 21 },
    "S7 C7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
    "S7 C8": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 21 },
    "RS7 C7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 20, maxDiameter: 21 },
    "RS7 C8": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 22 },
    "A8 D3": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "A8 D4": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 21 },
    "A8 D5": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 21 },
    "S8 D4": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 20, maxDiameter: 21 },
    "S8 D5": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 21 },
    "Q2 GA": { pcd: "5x100", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "Q3 8U": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "Q3 F3": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "RS Q3 F3": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 21 },
    "Q5 8R": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 18, maxDiameter: 20 },
    "Q5 FY": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 18, maxDiameter: 21 },
    "SQ5 8R": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 20 },
    "SQ5 FY": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 21 },
    "Q7 4L": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 18, maxDiameter: 22 }, // shares Cayenne 92A platform
    "Q7 4M": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 22 },
    "SQ7 4M": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 22 },
    "Q8 4MN": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 22 },
    "SQ8 4MN": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 22 },
    "RS Q8 4MN": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 21, maxDiameter: 23 },
    "R8 V8 Gen1": { pcd: "5x112", centreBore: "57.1mm front / 66.5mm rear", minDiameter: 19, maxDiameter: 19 },
    "R8 V10 Gen2": { pcd: "5x112", centreBore: "57.1mm front / 66.5mm rear", minDiameter: 19, maxDiameter: 20 },
    "TT 8N": { pcd: "5x100", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 18 },
    "TT 8J": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "TT 8S": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "TTS 8J": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 19 },
    "TTS 8S": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
    "TT RS 8J": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
    "TT RS 8S": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 20 },
  },

  Mercedes: {
    "A-Class W176": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "A-Class W177": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "A45 AMG W176": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 19 },
    "A45 S AMG W177": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 19 },
    "CLA C117": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "CLA C118": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "CLA 45 AMG C117": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 19 },
    "CLA 45 S AMG C118": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 19 },
    "C-Class W203": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 16, maxDiameter: 19 },
    "C-Class W204": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "C-Class W205": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 20 },
    "C-Class W206": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "C43 AMG W205": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "C43 AMG W206": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "C63 AMG W204": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "C63 AMG W205": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "C63 S AMG W205": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "C63 S AMG W206": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "E-Class W211": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 19 },
    "E-Class W212": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 17, maxDiameter: 20 },
    "E-Class W213": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "E43 AMG W213": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "E53 AMG W213": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "E63 AMG W212": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "E63 S AMG W213": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "S-Class W221": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "S-Class W222": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 21 },
    "S-Class W223": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "S63 AMG W222": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "S63 AMG W223": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 20, maxDiameter: 21 },
    "G-Class W463": { pcd: "5x130", centreBore: "84.1mm", minDiameter: 18, maxDiameter: 22 },
    "G-Class W464": { pcd: "5x130", centreBore: "84.1mm", minDiameter: 19, maxDiameter: 23 },
    "G63 AMG W463": { pcd: "5x130", centreBore: "84.1mm", minDiameter: 20, maxDiameter: 22 },
    "G63 AMG W464": { pcd: "5x130", centreBore: "84.1mm", minDiameter: 20, maxDiameter: 23 },
    "GLC X253": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 21 },
    "GLC X254": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 21 },
    "GLC 63 AMG X253": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "GLE W166": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 22 },
    "GLE W167": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 22 },
    "GLE 63 AMG W166": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 20, maxDiameter: 22 },
    "GLE 63 S AMG W167": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 20, maxDiameter: 22 },
    "AMG GT C190": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "AMG GT 4-Door X290": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
    "SL R231": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 },
    "SL R232": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 21 },
  },

  Volkswagen: {
    "Golf Mk4": { pcd: "5x100", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 18 },
    "Golf Mk5": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 19 },
    "Golf Mk6": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 19 },
    "Golf Mk7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "Golf Mk8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 20 },
    "Golf GTI Mk5": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "Golf GTI Mk6": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "Golf GTI Mk7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "Golf GTI Mk8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "Golf R Mk6": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 19 },
    "Golf R Mk7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "Golf R Mk7.5": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "Golf R Mk8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "Polo GTI 6C": { pcd: "5x100", centreBore: "57.1mm", minDiameter: 16, maxDiameter: 18 },
    "Polo GTI AW": { pcd: "5x100", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 18 },
    "Scirocco 13": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "Arteon 3H": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 18, maxDiameter: 20 },
    "Tiguan R": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 21 },
    "Passat B7": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 19 },
    "Passat B8": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 17, maxDiameter: 20 },
  },

  Porsche: {
    "911 Carrera 992": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 21 },
    "911 Carrera S 992": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 21 },
    "911 Carrera 4S 992": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 21 },
    "911 GT3 992": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 20, maxDiameter: 21 }, // centre-lock optional
    "911 GT3 RS 992": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 20, maxDiameter: 21 }, // centre-lock common
    "911 Turbo S 992": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 20, maxDiameter: 21 },
    "911 Carrera 991": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "911 Carrera S 991": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "911 GT3 991": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 20, maxDiameter: 21 },
    "911 GT3 RS 991": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 20, maxDiameter: 21 },
    "911 Turbo S 991": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "911 Carrera 997": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 18, maxDiameter: 19 },
    "911 GT3 997": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 19 },
    "911 GT3 RS 997": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 19 },
    "911 Turbo 997": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 19 },
    "718 Cayman": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 18, maxDiameter: 20 },
    "718 Cayman S": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "718 Cayman GT4": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "718 Cayman GT4 RS": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 20, maxDiameter: 20 },
    "718 Boxster": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 18, maxDiameter: 20 },
    "718 Boxster S": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "718 Spyder": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "Cayman GT4 981": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "Boxster Spyder 981": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 20 },
    "Cayenne 92A": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 18, maxDiameter: 22 },
    "Cayenne 9YA": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 19, maxDiameter: 22 },
    "Cayenne GTS 9YA": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 22 },
    "Cayenne Turbo 9YA": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 20, maxDiameter: 22 },
    "Macan 95B": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 18, maxDiameter: 21 },
    "Panamera 970": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 18, maxDiameter: 21 },
    "Panamera 971": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 21 },
    "Panamera Turbo S 971": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 20, maxDiameter: 21 },
    "Taycan": { pcd: "5x130", centreBore: "71.6mm", minDiameter: 19, maxDiameter: 21 },
  },

  Nissan: {
    "GT-R R35": { pcd: "5x114.3", centreBore: "66.1mm", minDiameter: 19, maxDiameter: 20 },
    "350Z Z33": { pcd: "5x114.3", centreBore: "66.1mm", minDiameter: 18, maxDiameter: 20 },
    "370Z Z34": { pcd: "5x114.3", centreBore: "66.1mm", minDiameter: 18, maxDiameter: 20 },
    "400Z / Z RZ34": { pcd: "5x114.3", centreBore: "66.1mm", minDiameter: 18, maxDiameter: 20 },
  },

  Toyota: {
    "GR Supra A90": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 18, maxDiameter: 20 }, // BMW Z4 G29 sister
    "86 / GT86 ZN6": { pcd: "5x100", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 19 },
    "GR86 ZN8": { pcd: "5x100", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 19 },
    "GR Yaris GXPA16": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 17, maxDiameter: 18 },
    "Camry XV70": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 17, maxDiameter: 19 },
    "GR Corolla": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 17, maxDiameter: 19 },
  },

  Subaru: {
    "WRX STI GD": { pcd: "5x114.3", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 18 }, // 2005-2007 cars; 2001-2004 STI used 5x100/56.1mm
    "WRX STI GR/GV": { pcd: "5x114.3", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 19 },
    "WRX STI VA": { pcd: "5x114.3", centreBore: "56.1mm", minDiameter: 18, maxDiameter: 19 },
    "WRX VB": { pcd: "5x114.3", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 19 },
    "BRZ ZC6": { pcd: "5x100", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 19 },
    "BRZ ZD8": { pcd: "5x100", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 19 },
    "Forester SH": { pcd: "5x100", centreBore: "56.1mm", minDiameter: 16, maxDiameter: 19 },
    "Forester SK": { pcd: "5x114.3", centreBore: "56.1mm", minDiameter: 17, maxDiameter: 19 },
  },

  Honda: {
    "Civic Type R FK2": { pcd: "5x120", centreBore: "64.1mm", minDiameter: 18, maxDiameter: 20 },
    "Civic Type R FK8": { pcd: "5x120", centreBore: "64.1mm", minDiameter: 18, maxDiameter: 20 },
    "Civic Type R FL5": { pcd: "5x120", centreBore: "64.1mm", minDiameter: 18, maxDiameter: 20 },
    "Integra Type R DC2": { pcd: "4x114.3", centreBore: "64.1mm", minDiameter: 15, maxDiameter: 17 },
    "Integra Type R DC5": { pcd: "5x114.3", centreBore: "64.1mm", minDiameter: 17, maxDiameter: 18 },
    "NSX NC1": { pcd: "5x120", centreBore: "70.1mm front / 64.1mm rear", minDiameter: 19, maxDiameter: 20 },
    "S2000 AP1/AP2": { pcd: "5x114.3", centreBore: "64.1mm", minDiameter: 17, maxDiameter: 18 },
  },

  Ford: {
    "Mustang S550": { pcd: "5x114.3", centreBore: "70.5mm", minDiameter: 18, maxDiameter: 20 },
    "Mustang S650": { pcd: "5x114.3", centreBore: "70.5mm", minDiameter: 18, maxDiameter: 20 },
    "Mustang GT500 S550": { pcd: "5x114.3", centreBore: "70.5mm", minDiameter: 19, maxDiameter: 20 },
    "Focus RS Mk3": { pcd: "5x108", centreBore: "63.4mm", minDiameter: 17, maxDiameter: 19 },
    "Falcon FG X": { pcd: "5x114.3", centreBore: "70.3mm", minDiameter: 17, maxDiameter: 20 },
    "Falcon GT": { pcd: "5x114.3", centreBore: "70.3mm", minDiameter: 18, maxDiameter: 20 },
  },

  Chevrolet: {
    "Corvette C7": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 18, maxDiameter: 20 }, // C7 stud spec is 5x120.65 (5x4.75")
    "Corvette Z06 C7": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 19, maxDiameter: 20 },
    "Corvette C8": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 19, maxDiameter: 20 },
    "Corvette Z06 C8": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 19, maxDiameter: 20 },
    "Camaro ZL1": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 19, maxDiameter: 20 },
  },

  Lamborghini: {
    "Huracán LP610-4": { pcd: "5x112", centreBore: "57.1mm front / 66.5mm rear", minDiameter: 19, maxDiameter: 20 },
    "Huracán EVO": { pcd: "5x112", centreBore: "57.1mm front / 66.5mm rear", minDiameter: 20, maxDiameter: 20 },
    "Huracán Performante": { pcd: "5x112", centreBore: "57.1mm front / 66.5mm rear", minDiameter: 20, maxDiameter: 20 },
    "Huracán STO": { pcd: "Centre lock", centreBore: "Centre lock", minDiameter: 20, maxDiameter: 20 },
    "Urus": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 21, maxDiameter: 23 },
    "Urus Performante": { pcd: "5x112", centreBore: "66.5mm", minDiameter: 22, maxDiameter: 23 },
    "Gallardo": { pcd: "5x112", centreBore: "57.1mm", minDiameter: 19, maxDiameter: 19 },
    "Aventador SVJ": { pcd: "Centre lock", centreBore: "Centre lock", minDiameter: 20, maxDiameter: 20 },
  },

  Ferrari: {
    "488 GTB": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "488 Pista": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "F8 Tributo": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "F8 Spider": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "SF90 Stradale": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "Roma": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "Purosangue": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 22, maxDiameter: 23 },
    "296 GTB": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "812 Superfast": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
    "F430": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 19, maxDiameter: 19 },
    "458 Italia": { pcd: "5x114.3", centreBore: "67.1mm", minDiameter: 20, maxDiameter: 20 },
  },

  McLaren: {
    "570S": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "600LT": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "620R": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "720S": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "765LT": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "GT": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 20, maxDiameter: 21 },
    "Artura": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
    "750S": { pcd: "5x112", centreBore: "66.6mm", minDiameter: 19, maxDiameter: 20 },
  },

  "Alfa Romeo": {
    "Giulia Quadrifoglio": { pcd: "5x110", centreBore: "65.1mm", minDiameter: 19, maxDiameter: 20 },
    "Stelvio Quadrifoglio": { pcd: "5x110", centreBore: "65.1mm", minDiameter: 20, maxDiameter: 21 },
    "Giulia Ti": { pcd: "5x110", centreBore: "65.1mm", minDiameter: 17, maxDiameter: 19 },
    "4C": { pcd: "5x98", centreBore: "58.1mm", minDiameter: 17, maxDiameter: 18 },
  },

  Lexus: {
    "IS300 XE30": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 17, maxDiameter: 19 },
    "IS350 XE30": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 17, maxDiameter: 19 },
    "IS500 XE30": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 19, maxDiameter: 19 },
    "RC F": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 19, maxDiameter: 19 },
    "LC500": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 20, maxDiameter: 21 },
    "GS F": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 19, maxDiameter: 19 },
    "LFA": { pcd: "5x114.3", centreBore: "60.1mm", minDiameter: 20, maxDiameter: 20 },
  },

  "Holden / HSV": {
    "Commodore VF": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 18, maxDiameter: 20 },
    "Commodore ZB": { pcd: "5x115", centreBore: "70.3mm", minDiameter: 18, maxDiameter: 20 }, // Opel Insignia B / Buick Regal sister
    "HSV GTS Gen F": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 19, maxDiameter: 20 },
    "HSV GTSR W1": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 20, maxDiameter: 20 },
    "Camaro 6th Gen": { pcd: "5x120", centreBore: "70.3mm", minDiameter: 19, maxDiameter: 20 },
  },
};

export function getVehicleFitment(make?: string, model?: string): VehicleFitment | null {
  if (!make || !model) return null;
  return vehicleFitment[make]?.[model] ?? null;
}

export const defaultMediaImage = "/media/hero-wheel-poster.jpg";

const DIAMETERS_1PC = ["16\"", "17\"", "18\"", "19\"", "20\"", "21\"", "22\"", "23\"", "24\""];
const DIAMETERS_2PC = ["18\"", "19\"", "20\"", "21\"", "22\"", "23\"", "24\""];
const WIDTHS_1PC = ["6.0\"", "6.5\"", "7.0\"", "7.5\"", "8.0\"", "8.5\"", "9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\"", "12.5\"", "13.0\""];
const WIDTHS_2PC = ["8.0\"", "8.5\"", "9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\""];
const PCDS = ["4x100", "4x108", "5x100", "5x108", "5x112", "5x114.3", "5x120", "5x130", "Centre lock"];
const CENTREBORES = ["54.1mm", "56.6mm", "57.1mm", "60.1mm", "63.4mm", "66.6mm", "67.1mm", "72.6mm", "73.1mm", "74.1mm", "77.0mm"];

const FINISH_FILES = [
  "Brushed Clear  .jpg",
  "Brushed Dark Clear.jpg",
  "Frozen Clear  .jpg",
  "Frozen Stone Bronze  .jpg",
  "Frozen Stone Champagne  .jpg",
  "Frozen Stone Dark Clear  .jpg",
  "Gloss Black.jpg",
  "Gloss Bronze  .jpg",
  "Gloss Charcoal.jpg",
  "Gloss Gold  .jpg",
  "Gloss Silver.jpg",
  "Gloss White  .jpg",
  "Gloss White Gold  .jpg",
  "Polished Dark Clear  .jpg",
  "Satin Black.jpg",
  "Satin Bronze  .jpg",
  "Satin Charcoal.jpg",
  "Satin Gold  .jpg",
  "Satin Silver.jpg",
  "Satin White Gold  .jpg",
  "Stone Bronze  .jpg",
  "Stone Champagne  .jpg",
  "Stone Dark Clear.jpg",
  "Textured Black.jpg",
] as const;

function formatFinishName(fileName: string) {
  return fileName.replace(/\.jpg$/i, "").replace(/\s+/g, " ").trim();
}

function getFinishSwatch(name: string) {
  const value = name.toLowerCase();

  if (value.includes("black")) return "#0F0F0F";
  if (value.includes("charcoal") || value.includes("dark")) return "#2A2A2A";
  if (value.includes("bronze") || value.includes("champagne") || value.includes("gold")) return "#B08B57";
  if (value.includes("white")) return "#F5F5F3";
  if (value.includes("silver") || value.includes("clear") || value.includes("polished")) return "#AFAFAD";

  return "#F5F5F3";
}

export const finishOptions: WheelFinish[] = FINISH_FILES.map((fileName) => {
  const name = formatFinishName(fileName);
  return {
    name,
    swatch: getFinishSwatch(name),
    image: `/finishes/${encodeURIComponent(fileName)}`,
  };
});

// Two-colour paint is the baseline used for the generic custom-finish estimate.
// Finish-specific pricing is available in the pricing calculator.
export const CUSTOM_FINISH_PRICE_AUD_PER_WHEEL =
  (addOnRrpIncGstAudPerSet("two-colour-paint") ?? 0) / 4;

// Treatments available under the 1-piece custom appearance surcharge.
export const customFinishOptions: ReadonlyArray<{ name: string; copy: string }> = [
  {
    name: "Dual-tone brushed / polished",
    copy: "Two surface treatments combined on the same face — brushed centre with polished spokes, or any pairing.",
  },
  {
    name: "Custom paint",
    copy: "Any paint colour or coat — bring a paint code, sample, or chassis reference and we match it.",
  },
  {
    name: "Centre brushed",
    copy: "Brushed treatment isolated to the centre of the wheel face.",
  },
  {
    name: "Centre polished",
    copy: "Mirror-polished finish across the wheel face for the most reflective read.",
  },
  {
    name: "Chrome finish",
    copy: "Full chrome face for the most reflective, deliberate read.",
  },
];

export function formatAud(amount: number): string {
  const hasCents = amount % 1 !== 0;
  return `$${amount.toLocaleString("en-AU", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  })}`;
}

// Named production wheels live here. Naming convention: MW-XY where X is the
// piece count (1 = monoblock, 2 = 2-piece) and Y is the sequential design number.
type NamedSeries = "1-Piece Forged" | "2-Piece Forged";

const SERIES_FACTS: Record<
  NamedSeries,
  {
    fallbackPrice: string;
    leadTime: string;
    construction: string;
    diameterRange: string;
    widthRange: string;
    offsetRange: string;
    diameterOptions: string[];
    widthOptions: string[];
  }
> = {
  "1-Piece Forged": {
    fallbackPrice: "From AUD $638/wheel inc. GST",
    leadTime: "approximately 20 days from order confirmation",
    construction: "1-piece forged monoblock",
    diameterRange: "16 to 24 inches",
    widthRange: "6.0 to 13.0 inches",
    offsetRange: "Resolved per chassis",
    diameterOptions: DIAMETERS_1PC,
    widthOptions: WIDTHS_1PC,
  },
  "2-Piece Forged": {
    fallbackPrice: "From AUD $1,042/wheel inc. GST",
    leadTime: "approximately 30 days from order confirmation",
    construction: "2-piece forged",
    diameterRange: "18 to 24 inches",
    widthRange: "8.0 to 12.0 inches",
    offsetRange: "Extended range - resolved per chassis",
    diameterOptions: DIAMETERS_2PC,
    widthOptions: WIDTHS_2PC,
  },
};

function buildNamedProduct(args: {
  handle: string;
  title: string;
  series: NamedSeries;
  shortDescription: string;
  description: string;
  imageFileNames: string[];
  imageBasePath?: "/products" | "/Wheels";
}): CatalogProduct {
  const facts = SERIES_FACTS[args.series];
  const tierRange = priceRangeForSeries(args.series);
  const price = tierRange
    ? `From AUD ${formatAud(tierRange.minPerWheel)}/wheel inc. GST`
    : facts.fallbackPrice;

  return {
    id: `wheel-${args.handle.toLowerCase()}`,
    handle: args.handle,
    title: args.title,
    series: args.series,
    shortDescription: args.shortDescription,
    description: args.description,
    price,
    leadTime: facts.leadTime,
    images: args.imageFileNames.map((fileName, index) => ({
      url: fileName.startsWith("/")
        ? fileName
        : `${args.imageBasePath ?? "/products"}/${encodeURIComponent(fileName)}`,
      alt: `${args.title} forged wheel${index === 0 ? "" : ` — view ${index + 1}`}`,
    })),
    finishes: finishOptions,
    specs: [
      { label: "Construction", value: facts.construction },
      { label: "Finish", value: "Multiple finishes available" },
      { label: "Diameter range", value: facts.diameterRange },
      { label: "Width range", value: facts.widthRange },
      { label: "PCD", value: "Matched to vehicle - full range available" },
      { label: "Offset", value: facts.offsetRange },
    ],
    diameterOptions: facts.diameterOptions,
    widthOptions: facts.widthOptions,
    pcdOptions: PCDS,
    offsetRange: facts.offsetRange,
    centreboreOptions: CENTREBORES,
  };
}

const namedProducts: CatalogProduct[] = [
  buildNamedProduct({
    handle: "MW-11",
    title: 'MW-11 "Serraglio"',
    series: "1-Piece Forged",
    shortDescription: "The first design in the MonzaWheels 1-piece forged library.",
    description:
      'MW-11 "Serraglio" is the inaugural design in the MonzaWheels 1-piece forged library. The face and barrel are machined from a single forged 6061-T6 billet for the lowest weight, the stiffest structure, and the cleanest visual read. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: [
      'MW-11 "Serraglio" 1.png',
      'MW-11 "Serraglio" 2.PNG',
      'MW-11 "Serraglio" 3.PNG',
    ],
  }),
  buildNamedProduct({
    handle: "MW-21",
    title: 'MW-21 "Ascari"',
    series: "2-Piece Forged",
    shortDescription: "The first design in the MonzaWheels 2-piece forged library.",
    description:
      'MW-21 "Ascari" is the inaugural design in the MonzaWheels 2-piece forged library. Disc and barrel are forged separately and bolted together for deeper dish, extended offsets, and a stronger visual contrast against the chassis. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: [
      'MW-21 "Ascari" 1.png',
      'MW-21 "Ascari" 2.JPG',
      'MW-21 "Ascari" 3.JPG',
    ],
  }),
  buildNamedProduct({
    handle: "MW-22",
    title: 'MW-22 "Lesmo"',
    series: "2-Piece Forged",
    shortDescription: "The second design in the MonzaWheels 2-piece forged library.",
    description:
      'MW-22 "Lesmo" extends the MonzaWheels 2-piece forged library with a new split construction for deeper dish, stronger contrast, and a more technical visual read. Final diameter, width, PCD, centre bore, and offset are still confirmed around the exact vehicle before production.',
    imageFileNames: [
      'MW-22 "Lesmo" 1.jpeg',
      'MW-22 "Lesmo" 2.jpeg',
      'MW-22 "Lesmo" 3.jpeg',
    ],
  }),
  buildNamedProduct({
    handle: "MW-17",
    title: 'MW-17 "Sopraelevata"',
    series: "1-Piece Forged",
    shortDescription: "A sharply sculpted split-five monoblock with fine spoke bridges and an open, technical face.",
    description:
      'MW-17 "Sopraelevata" combines five divided spoke groups with slim connecting bridges and deeply relieved pockets around the hub. The long, angular geometry opens the face around the brake package while giving the forged monoblock a light, highly technical profile. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["a1.PNG", "a2.PNG", "a3.PNG"],
  }),
  buildNamedProduct({
    handle: "MW-28",
    title: 'MW-28 "Biondetti"',
    series: "2-Piece Forged",
    shortDescription: "A near-solid aero disc punctuated by five sculpted windows and a polished deep lip.",
    description:
      'MW-28 "Biondetti" gives the classic aero-disc form a technical 2-piece treatment. Five deeply machined perimeter windows break the broad brushed face, while exposed hardware and a mirror-polished step lip add contrast and depth. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["/products/b1.PNG", "/products/b2.PNG", "/products/b3.PNG", "2f.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-12",
    title: 'MW-12 "Roggia"',
    series: "1-Piece Forged",
    shortDescription: "A directional split-spoke monoblock with a sharply machined outer edge.",
    description:
      'MW-12 "Roggia" brings a directional split-spoke face to the MonzaWheels monoblock library. Ten angular spokes sweep into a deeply relieved centre, while the machined perimeter keeps the profile light and technical. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1A.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-13",
    title: 'MW-13 "Parabolica"',
    series: "1-Piece Forged",
    shortDescription: "A fine split-ten-spoke design with long, tensioned lines and subtle concavity.",
    description:
      'MW-13 "Parabolica" uses ten fine split spokes to draw the eye from the hub to the rim in one continuous movement. Its long machined edges and restrained concavity create an elegant motorsport profile without visual weight. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1B.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-14",
    title: 'MW-14 "Curva Grande"',
    series: "1-Piece Forged",
    shortDescription: "A sculpted twin-five-spoke monoblock with open brake visibility.",
    description:
      'MW-14 "Curva Grande" is shaped around five broad spoke pairs that fork cleanly toward the outer rim. Deep pockets around the hub and generous openings expose the brake package while giving the face a planted, structural stance. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1C.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-15",
    title: 'MW-15 "Variante"',
    series: "1-Piece Forged",
    shortDescription: "A dense multi-spoke monoblock with a classic competition rhythm.",
    description:
      'MW-15 "Variante" translates a classic endurance-racing mesh into a clean forged monoblock. Closely spaced spokes, a stepped outer edge, and a compact centre create a precise, mechanical read suited to both modern and period-inspired builds. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1D.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-16",
    title: 'MW-16 "Tamburello"',
    series: "1-Piece Forged",
    shortDescription: "A lightweight ten-spoke face defined by crisp channels and open geometry.",
    description:
      'MW-16 "Tamburello" pairs ten slender spokes with crisp recessed channels that sharpen the face without adding visual mass. The open windows and gentle concavity make the design feel fast at rest and leave the brake hardware fully visible. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1E.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-18",
    title: 'MW-18 "Acque Minerali"',
    series: "1-Piece Forged",
    shortDescription: "A deep-concave ten-spoke monoblock with a dark, machined-face finish.",
    description:
      'MW-18 "Acque Minerali" combines ten slender spokes with a pronounced drop into the centre bowl. A dark finish and fine machined edges emphasise the concavity, producing a technical silhouette with a restrained motorsport character. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1g.PNG"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-19",
    title: 'MW-19 "Tosa"',
    series: "1-Piece Forged",
    shortDescription: "A fine multi-spoke monoblock with a warm satin finish and stepped rim.",
    description:
      'MW-19 "Tosa" is built around a dense field of fine spokes that meet a subtly stepped outer rim. The warm satin finish and restrained centre bowl give the design an elegant touring character while retaining clear competition influence. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1h.PNG"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-110",
    title: 'MW-110 "Piratella"',
    series: "1-Piece Forged",
    shortDescription: "A bold five-spoke monoblock with broad surfaces and a deep gloss finish.",
    description:
      'MW-20 "Piratella" reduces the monoblock form to five broad spokes and a clean, uninterrupted centre. Strong planar surfaces, softened spoke roots, and a deep gloss finish create a deliberately simple wheel with substantial visual presence. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1i.PNG"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-111",
    title: 'MW-111 "Rivazza"',
    series: "1-Piece Forged",
    shortDescription: "A machined split-five monoblock with layered spokes and strong directional tension.",
    description:
      'MW-111 "Rivazza" builds a sharply layered face from five divided spoke groups. Bright machined edges trace each spoke over deep graphite pockets, creating pronounced direction and generous openings around the brake package. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1j.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-112",
    title: 'MW-112 "Villeneuve"',
    series: "1-Piece Forged",
    shortDescription: "A clean broad five-spoke monoblock with deep windows and uncompromised visual strength.",
    description:
      'MW-112 "Villeneuve" distils the forged monoblock into five broad, sharply defined spokes. Deep triangular windows and recessed spoke faces remove visual weight from the substantial structure, while the brushed finish keeps the profile technical and precise. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1k.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-113",
    title: 'MW-113 "Gresini"',
    series: "1-Piece Forged",
    shortDescription: "A lightweight paired multi-spoke monoblock with open brake visibility and a clean stepped rim.",
    description:
      'MW-113 "Gresini" uses ten slender spokes arranged in close pairs to create a light, competition-led face. Alternating open windows and a restrained centre bowl keep the geometry precise, while the stepped outer rim gives the design a subtle touring-car character. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["1l.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-23",
    title: 'MW-23 "San Donato"',
    series: "2-Piece Forged",
    shortDescription: "An intricate mesh centre paired with exposed hardware and a polished step lip.",
    description:
      'MW-23 "San Donato" brings an intricate cross-laced mesh centre to the MonzaWheels 2-piece library. Exposed assembly hardware and a deep polished step lip frame the dense forged face, creating a layered, technical profile with strong heritage influence. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2A.PNG"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-24",
    title: 'MW-24 "Casanova"',
    series: "2-Piece Forged",
    shortDescription: "A directional split-five centre set inside a deep polished barrel.",
    description:
      'MW-24 "Casanova" sets a sharply directional split-five centre inside a deep polished barrel. The slender spoke tips overlap the exposed fastener line, adding movement and depth while keeping the brake package open to view. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2B.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-25",
    title: 'MW-25 "Savelli"',
    series: "2-Piece Forged",
    shortDescription: "A fluid five-spoke centre with sculpted surfaces and a mirror-polished lip.",
    description:
      'MW-25 "Savelli" shapes five broad spokes into a fluid, almost turbine-like forged centre. The dark reflective face rolls into a polished outer lip and exposed hardware, balancing a clean five-spoke layout with the depth of 2-piece construction. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2c.PNG"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-26",
    title: 'MW-26 "Arrabbiata"',
    series: "2-Piece Forged",
    shortDescription: "A muscular five-spoke centre contrasted against a polished deep-dish barrel.",
    description:
      'MW-26 "Arrabbiata" pairs a muscular five-spoke centre with the pronounced depth of a polished 2-piece barrel. Broad bronze faces, exposed perimeter hardware, and a simple hub treatment give the design a purposeful GT-era stance. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2d.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-27",
    title: 'MW-27 "Bucine"',
    series: "2-Piece Forged",
    shortDescription: "A fine radial multi-spoke centre framed by a polished step lip.",
    description:
      'MW-27 "Bucine" uses a fine radial multi-spoke centre to create a clean, almost continuous sweep around the wheel face. The bright forged centre, exposed fasteners, and polished step lip deliver a precise touring profile with unmistakable multi-piece depth. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2e.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-29",
    title: 'MW-29 "Correntaio"',
    series: "2-Piece Forged",
    shortDescription: "A full aero face ringed by precision cooling slots and a polished outer barrel.",
    description:
      'MW-29 "Correntaio" pairs a clean forged aero face with a ring of precisely machined ventilation slots. The stepped perimeter creates a turbine-like rhythm around the solid centre, framed by the depth and bright edge of a polished 2-piece barrel. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2g.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-210",
    title: 'MW-210 "Scarperia"',
    series: "2-Piece Forged",
    shortDescription: "A broad five-spoke centre with deep relief, exposed hardware, and a polished step lip.",
    description:
      'MW-210 "Scarperia" sets five substantial forged spokes inside a deep polished 2-piece barrel. Recessed spoke faces and dark machined pockets sharpen the centre, while the exposed perimeter hardware gives the clean five-spoke form a distinctly mechanical edge. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2h.png"],
    imageBasePath: "/Wheels",
  }),
  buildNamedProduct({
    handle: "MW-211",
    title: 'MW-211 "Palagio"',
    series: "2-Piece Forged",
    shortDescription: "An elegant ten-spoke centre with long tapered lines and a bright polished barrel.",
    description:
      'MW-211 "Palagio" uses ten long, slender spokes to draw the forged centre cleanly from hub to rim. Subtle channels add definition without interrupting the flowing face, while the polished 2-piece barrel brings depth and a crisp outer edge. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: ["2i.png"],
    imageBasePath: "/Wheels",
  }),
];

export const fallbackProducts: CatalogProduct[] = [...namedProducts];

// Populated as customer builds are delivered and photographed.
export const deliveredSets: DeliveredSet[] = [];

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
    title: "Certified to international standards",
    copy: "Every wheel is JWL certified and tested to an enhanced internal standard that exceeds JWL, SAE, and PCT requirements across bending fatigue, radial fatigue, and impact resistance. Operations are managed from Brisbane.",
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
    note: "Direct quoting, chassis reviews, and finish consultations managed from Brisbane. All enquiries are handled personally.",
    contact: BRAND_EMAIL,
  },
];

export const collectionSummaries: CollectionSummary[] = [
  {
    slug: "monoblock",
    label: "1-Piece Forged",
    title: "Monoblock",
    description: "Single-piece forged wheels for clean street, OEM-plus, and track-focused builds. Choose a face, then MonzaWheels confirms sizing around the car. Available 15–24 inches.",
    handles: fallbackProducts
      .filter((product) => product.series === "1-Piece Forged")
      .map((product) => product.handle),
  },
  {
    slug: "multi-piece",
    label: "2-Piece Forged",
    title: "Multi-Piece",
    description: "Two-piece forged wheels for deeper dish, exposed lip detail, and aggressive staggered builds. Choose the look, then MonzaWheels confirms geometry around the car. Available 18–24 inches.",
    handles: fallbackProducts
      .filter((product) => product.series === "2-Piece Forged")
      .map((product) => product.handle),
  },
];
