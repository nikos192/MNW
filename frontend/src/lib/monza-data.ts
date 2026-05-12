import { BRAND_EMAIL } from "@/lib/brand";

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
// (so we don't offer 15" wheels for an M4, for example).
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

const DIAMETERS_1PC = ["15\"", "16\"", "17\"", "18\"", "19\"", "20\"", "21\"", "22\"", "23\"", "24\""];
const DIAMETERS_2PC = ["18\"", "19\"", "20\"", "21\"", "22\"", "23\"", "24\""];
const WIDTHS_1PC = ["6.0\"", "6.5\"", "7.0\"", "7.5\"", "8.0\"", "8.5\"", "9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\""];
const WIDTHS_2PC = ["8.0\"", "8.5\"", "9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\"", "12.0\"", "12.5\"", "13.0\"", "13.5\""];
const PCDS = ["4x100", "4x108", "5x100", "5x108", "5x112", "5x114.3", "5x120", "5x130", "Centre lock"];
const CENTREBORES = ["54.1mm", "56.6mm", "57.1mm", "60.1mm", "63.4mm", "66.6mm", "67.1mm", "72.6mm", "73.1mm", "74.1mm", "77.0mm"];
const PRODUCT_CODES = [
  "1A1",
  "1A2",
  "1B1",
  "1B2",
  "1C1",
  "1C2",
  "1D1",
  "1D2",
  "1E1",
  "1E2",
  "1F1",
  "1F2",
  "2A1",
  "2A2",
  "2B1",
  "2B2",
  "2C1",
  "2C2",
] as const;

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

const FINISH_BY_VARIANT: Record<string, { name: string; swatch: string }> = {
  "1": { name: "Silver", swatch: "#AFAFAD" },
  "2": { name: "Gloss black", swatch: "#0F0F0F" },
};

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

const PRODUCT_FAMILIES = Array.from(
  new Set(PRODUCT_CODES.map((code) => code.slice(0, 2))),
).sort() as Array<`${1 | 2}${string}`>;

// PRICING (per wheel, AUD). Source: forged wheel pricing sheet.
// Supplier prices are marked up via RETAIL_MARKUP to reach customer-facing pricing.
// Centre caps are included with every wheel set.
export type DiameterPrice = {
  diameter: number;
  widthRange: string;
  priceAudPerWheel: number;
};

export type CarbonPrice = {
  diameter: number;
  width: string;
  priceAudPerWheel: number;
};

export type AccessoryPrice = {
  name: string;
  priceAud: number;
  unit: string;
};

const RETAIL_MARKUP = 1.5;

function retail(supplierAud: number): number {
  return Math.round(supplierAud * RETAIL_MARKUP);
}

const supplier1Pc: ReadonlyArray<{ diameter: number; widthRange: string; supplierAud: number }> = [
  { diameter: 15, widthRange: "7J", supplierAud: 504 },
  { diameter: 16, widthRange: "5.5J–8J", supplierAud: 462 },
  { diameter: 17, widthRange: "7J–10J", supplierAud: 504 },
  { diameter: 18, widthRange: "7.5J–13J", supplierAud: 546 },
  { diameter: 19, widthRange: "8J–12J", supplierAud: 588 },
  { diameter: 20, widthRange: "8J–12.5J", supplierAud: 630 },
  { diameter: 21, widthRange: "8.5J–13J", supplierAud: 693 },
  { diameter: 22, widthRange: "8.5J–12.5J", supplierAud: 777 },
  { diameter: 23, widthRange: "9.5J–13J", supplierAud: 1050 },
  { diameter: 24, widthRange: "9.5J–13J", supplierAud: 1155 },
];

const supplier2Pc: ReadonlyArray<{ diameter: number; widthRange: string; supplierAud: number }> = [
  { diameter: 18, widthRange: "8J–12J", supplierAud: 882 },
  { diameter: 19, widthRange: "8.5J–12J", supplierAud: 924 },
  { diameter: 20, widthRange: "8.5J–12J", supplierAud: 987 },
  { diameter: 21, widthRange: "8.5J–12J", supplierAud: 1071 },
  { diameter: 22, widthRange: "8.5J–12J", supplierAud: 1176 },
  { diameter: 23, widthRange: "8.5J–12J", supplierAud: 1302 },
  { diameter: 24, widthRange: "9J–12J", supplierAud: 1428 },
];

const supplier2PcCarbon: ReadonlyArray<{ diameter: number; width: string; supplierAud: number }> = [
  { diameter: 19, width: "8.5J", supplierAud: 3738 },
  { diameter: 20, width: "8.5J", supplierAud: 3948 },
  { diameter: 20, width: "9.5J", supplierAud: 4158 },
  { diameter: 20, width: "10.5J", supplierAud: 4368 },
  { diameter: 21, width: "9.5J", supplierAud: 4368 },
  { diameter: 21, width: "10.5J", supplierAud: 4578 },
];

export const pricing1Pc: DiameterPrice[] = supplier1Pc.map((row) => ({
  diameter: row.diameter,
  widthRange: row.widthRange,
  priceAudPerWheel: retail(row.supplierAud),
}));

export const pricing2Pc: DiameterPrice[] = supplier2Pc.map((row) => ({
  diameter: row.diameter,
  widthRange: row.widthRange,
  priceAudPerWheel: retail(row.supplierAud),
}));

export const pricing2PcCarbon: CarbonPrice[] = supplier2PcCarbon.map((row) => ({
  diameter: row.diameter,
  width: row.width,
  priceAudPerWheel: retail(row.supplierAud),
}));

// Centre caps are included with every wheel set — their retail cost is bundled
// into the per-set total below rather than offered as a paid extra.
const CENTRE_CAPS_RETAIL_PER_SET = retail(73.5);

export const accessoryPricing: AccessoryPrice[] = [
  { name: "Custom off-catalogue finish (1-piece)", priceAud: retail(31.5), unit: "per wheel" },
];

export type PriceRange = {
  minPerWheel: number;
  maxPerWheel: number;
  minPerSet: number;
  maxPerSet: number;
};

function priceRangeFromTable(table: DiameterPrice[], minDiameter?: number, maxDiameter?: number): PriceRange | null {
  let entries = table;
  if (typeof minDiameter === "number" && typeof maxDiameter === "number") {
    entries = table.filter((row) => row.diameter >= minDiameter && row.diameter <= maxDiameter);
  }
  if (entries.length === 0) return null;
  const prices = entries.map((row) => row.priceAudPerWheel);
  const minPerWheel = Math.min(...prices);
  const maxPerWheel = Math.max(...prices);
  // Set price = 4 wheels + included centre caps.
  return {
    minPerWheel,
    maxPerWheel,
    minPerSet: minPerWheel * 4 + CENTRE_CAPS_RETAIL_PER_SET,
    maxPerSet: maxPerWheel * 4 + CENTRE_CAPS_RETAIL_PER_SET,
  };
}

export function priceRangeForSeries(series: string, minDiameter?: number, maxDiameter?: number): PriceRange | null {
  if (series === "1-Piece Forged") return priceRangeFromTable(pricing1Pc, minDiameter, maxDiameter);
  if (series === "2-Piece Forged") return priceRangeFromTable(pricing2Pc, minDiameter, maxDiameter);
  return null;
}

export function priceForDiameter(series: string, diameter: number): number | null {
  const table = series === "1-Piece Forged" ? pricing1Pc : series === "2-Piece Forged" ? pricing2Pc : null;
  if (!table) return null;
  return table.find((row) => row.diameter === diameter)?.priceAudPerWheel ?? null;
}

// Retail cost of the centre caps that come bundled with every wheel set.
// Exposed so callers can show "centre caps included (worth $X)" if desired.
export const CENTRE_CAPS_INCLUDED_VALUE_AUD = CENTRE_CAPS_RETAIL_PER_SET;
export const CUSTOM_FINISH_PRICE_AUD_PER_WHEEL = retail(31.5);

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

function buildFallbackProduct(familyCode: (typeof PRODUCT_FAMILIES)[number]): CatalogProduct {
  const match = familyCode.match(/^([12])([A-Z])$/);

  if (!match) {
    throw new Error(`Unexpected product family: ${familyCode}`);
  }

  const [, pieceCode, wheelCode] = match;
  const isOnePiece = pieceCode === "1";
  const series = isOnePiece ? "1-Piece Forged" : "2-Piece Forged";
  const leadTime = isOnePiece ? "approximately 20 days from order confirmation" : "approximately 25 days from order confirmation";
  const tierRange = priceRangeForSeries(series);
  const price = tierRange
    ? `From AUD ${formatAud(tierRange.minPerWheel)}/wheel`
    : isOnePiece
      ? "From AUD $462/wheel"
      : "From AUD $882/wheel";
  const diameterRange = isOnePiece ? "15 to 24 inches" : "18 to 24 inches";
  const widthRange = isOnePiece ? "6.0 to 12.0 inches" : "8.0 to 13.5 inches";
  const diameterOptions = isOnePiece ? DIAMETERS_1PC : DIAMETERS_2PC;
  const widthOptions = isOnePiece ? WIDTHS_1PC : WIDTHS_2PC;
  const construction = isOnePiece ? "1-piece forged monoblock" : "2-piece forged";
  const offsetRange = isOnePiece ? "Resolved per chassis" : "Extended range - resolved per chassis";
  const familyImages = PRODUCT_CODES
    .filter((code) => code.startsWith(familyCode))
    .map((code) => {
      const variantCode = code.slice(-1);
      const variantFinish = FINISH_BY_VARIANT[variantCode];
      return {
        url: `/products/${code}.png`,
        alt: `${familyCode} wheel in ${variantFinish.name.toLowerCase()}`,
      };
    });
  const variantFinishNames = PRODUCT_CODES
    .filter((code) => code.startsWith(familyCode))
    .map((code) => FINISH_BY_VARIANT[code.slice(-1)]?.name.toLowerCase())
    .filter(Boolean)
    .join(" and ");

  return {
    id: `wheel-${familyCode.toLowerCase()}`,
    handle: familyCode,
    title: familyCode,
    series,
    shortDescription: `${series} wheel ${wheelCode} shown in ${variantFinishNames}.`,
    description:
      `${familyCode} is wheel ${wheelCode} in the ${series.toLowerCase()} range, shown here in ${variantFinishNames}. ` +
      "Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.",
    price,
    leadTime,
    images: familyImages,
    finishes: finishOptions,
    specs: [
      { label: "Construction", value: construction },
      { label: "Finish", value: "Multiple finishes available" },
      { label: "Diameter range", value: diameterRange },
      { label: "Width range", value: widthRange },
      { label: "PCD", value: "Matched to vehicle - full range available" },
      { label: "Offset", value: offsetRange },
    ],
    diameterOptions,
    widthOptions,
    pcdOptions: PCDS,
    offsetRange,
    centreboreOptions: CENTREBORES,
  };
}

// Named production wheels live here and take precedence over the placeholder
// alphabetical families above. Naming convention: MW-XY where X is the piece
// count (1 = monoblock, 2 = 2-piece) and Y is the sequential design number.
function buildNamedTwoPieceProduct(args: {
  handle: string;
  title: string;
  shortDescription: string;
  description: string;
  imageFileNames: string[];
}): CatalogProduct {
  const series = "2-Piece Forged";
  const tierRange = priceRangeForSeries(series);
  const price = tierRange
    ? `From AUD ${formatAud(tierRange.minPerWheel)}/wheel`
    : "From AUD $1,323/wheel";

  return {
    id: `wheel-${args.handle.toLowerCase()}`,
    handle: args.handle,
    title: args.title,
    series,
    shortDescription: args.shortDescription,
    description: args.description,
    price,
    leadTime: "approximately 25 days from order confirmation",
    images: args.imageFileNames.map((fileName, index) => ({
      url: `/products/${encodeURIComponent(fileName)}`,
      alt: `${args.title} forged wheel${index === 0 ? "" : ` — view ${index + 1}`}`,
    })),
    finishes: finishOptions,
    specs: [
      { label: "Construction", value: "2-piece forged" },
      { label: "Finish", value: "Multiple finishes available" },
      { label: "Diameter range", value: "18 to 24 inches" },
      { label: "Width range", value: "8.0 to 13.5 inches" },
      { label: "PCD", value: "Matched to vehicle - full range available" },
      { label: "Offset", value: "Extended range - resolved per chassis" },
    ],
    diameterOptions: DIAMETERS_2PC,
    widthOptions: WIDTHS_2PC,
    pcdOptions: PCDS,
    offsetRange: "Extended range - resolved per chassis",
    centreboreOptions: CENTREBORES,
  };
}

const namedProducts: CatalogProduct[] = [
  buildNamedTwoPieceProduct({
    handle: "MW-21",
    title: 'MW-21 "Ascari"',
    shortDescription: "The first design in the MonzaWheels 2-piece forged library.",
    description:
      'MW-21 "Ascari" is the inaugural design in the MonzaWheels 2-piece forged library. Disc and barrel are forged separately and bolted together for deeper dish, extended offsets, and a stronger visual contrast against the chassis. Final diameter, width, PCD, centre bore, and offset are confirmed around the exact vehicle before production.',
    imageFileNames: [
      "MW-21 Ascari 1.png",
      "MW-21 Ascari 2.JPG",
      "MW-21 Ascari 3.JPG",
    ],
  }),
];

export const fallbackProducts: CatalogProduct[] = [
  ...namedProducts,
  ...PRODUCT_FAMILIES.map(buildFallbackProduct),
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
    description: "Single-piece forged faces for cleaner chassis, tighter proportions, and the most direct visual read. Available 15–24 inches.",
    handles: fallbackProducts
      .filter((product) => product.series === "1-Piece Forged")
      .map((product) => product.handle),
  },
  {
    slug: "multi-piece",
    label: "2-Piece Forged",
    title: "Multi-Piece",
    description: "Two-piece forged construction for deeper dish, extended offsets, and a stronger statement on hero builds. Available 18–24 inches.",
    handles: fallbackProducts
      .filter((product) => product.series === "2-Piece Forged")
      .map((product) => product.handle),
  },
];
