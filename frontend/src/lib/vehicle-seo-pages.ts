export type VehicleSeoPage = {
  slug: string;
  make: string;
  model: string;
  displayName: string;
  audienceCopy: string;
};

export const VEHICLE_SEO_PAGES: VehicleSeoPage[] = [
  {
    slug: "bmw-m3-g80",
    make: "BMW",
    model: "M3 G80",
    displayName: "BMW M3 G80",
    audienceCopy: "Resolve an aggressive staggered forged setup around the G80 chassis, brake package and suspension rather than relying on a generic shelf offset.",
  },
  {
    slug: "bmw-m4-g82",
    make: "BMW",
    model: "M4 G82",
    displayName: "BMW M4 G82",
    audienceCopy: "Build a monoblock or two-piece G82 set with diameter, width, concavity and clearance considered as one complete fitment.",
  },
  {
    slug: "toyota-gr-supra-a90",
    make: "Toyota",
    model: "GR Supra A90",
    displayName: "Toyota GR Supra A90",
    audienceCopy: "Develop a forged Supra fitment around the exact brake and suspension setup, from restrained street geometry to a more assertive staggered stance.",
  },
  {
    slug: "nissan-gtr-r35",
    make: "Nissan",
    model: "GT-R R35",
    displayName: "Nissan GT-R R35",
    audienceCopy: "Specify an R35 forged wheel set with the load path, brake package, stagger and clearance reviewed before machining.",
  },
  {
    slug: "porsche-911-992",
    make: "Porsche",
    model: "911 Carrera 992",
    displayName: "Porsche 911 992",
    audienceCopy: "Resolve a chassis-specific 992 stagger with the rear width, brake clearance and design proportions treated as part of the same program.",
  },
  {
    slug: "mercedes-c63-w205",
    make: "Mercedes",
    model: "C63 AMG W205",
    displayName: "Mercedes-AMG C63 W205",
    audienceCopy: "Create a forged W205 C63 set around its brake package, ride height and intended stance, with final geometry approved before production.",
  },
];

export function getVehicleSeoPage(slug: string) {
  return VEHICLE_SEO_PAGES.find((page) => page.slug === slug);
}
