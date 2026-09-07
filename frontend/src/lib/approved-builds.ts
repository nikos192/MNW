// Existing approved Our Favourites content. Product links identify verified wheel associations.
export type FavouriteBuild = {
  car: string;
  wheel: string;
  description: string;
  images: string[];
  imageAlt: string;
  href: string;
};

export const favouriteBuilds: FavouriteBuild[] = [
  {
    car: "McLaren 720S",
    wheel: "Bespoke white forged wheels",
    description:
      "A bold, bespoke setup shaped around the 720S. The custom white finish traces its sculpted surfaces and gives the supercar an unmistakably individual stance.",
    images: Array.from(
      { length: 5 },
      (_, index) => `/favourites/720s%20${index + 1}.png`,
    ),
    imageAlt: "White McLaren 720S on bespoke white Monza forged wheels",
    href: "/contact?design=custom",
  },
  {
    car: "Mercedes-AMG E63 S",
    wheel: "Black MW-22 “Lesmo”",
    description:
      "Black MW-22 Lesmo wheels sharpen the E63 S without overpowering it. The result is aggressive and understated, balancing executive restraint with the car’s formidable performance character.",
    images: Array.from(
      { length: 3 },
      (_, index) => `/favourites/e63s%20${index + 1}.png`,
    ),
    imageAlt: "Mercedes-AMG E63 S fitted with black MW-22 Lesmo wheels",
    href: "/shop/MW-22",
  },
  {
    car: "BMW F82 M4 Competition",
    wheel: "Polished MW-21 “Ascari”",
    description:
      "Polished MW-21 Ascari wheels bring a crisp, technical contrast to Yas Marina Blue. The bright multi-piece finish catches the light and gives the F82’s muscular proportions even more presence.",
    images: Array.from(
      { length: 5 },
      (_, index) => `/favourites/M4%20Competition%20${index + 1}.png`,
    ),
    imageAlt:
      "Yas Marina Blue BMW F82 M4 Competition on polished MW-21 Ascari wheels",
    href: "/shop/MW-21",
  },
];
