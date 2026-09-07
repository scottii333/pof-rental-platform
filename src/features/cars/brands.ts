export type CarBrand = { name: string; logo: string };

export const CAR_BRANDS: CarBrand[] = [
  { name: "Rolls-Royce", logo: "/car-brand/rolls-royce.svg" },
  { name: "Bentley", logo: "/car-brand/bentley-logo.svg" },
  { name: "Ferrari", logo: "/car-brand/ferrari-logo.svg" },
  { name: "Lamborghini", logo: "/car-brand/lamborghini-logo.svg" },
  { name: "McLaren", logo: "/car-brand/mclaren-logo.svg" },
  { name: "Mercedes-Benz", logo: "/car-brand/mercedes-benz.svg" },
  { name: "Porsche", logo: "/car-brand/porsche-logo.svg" },
  { name: "BYD", logo: "/car-brand/byd.svg" },
];

const LOGO_BY_BRAND = new Map(
  CAR_BRANDS.map((brand) => [brand.name, brand.logo]),
);

export const getBrandLogo = (brand: string): string | undefined =>
  LOGO_BY_BRAND.get(brand);
