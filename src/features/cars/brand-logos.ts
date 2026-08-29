const BRAND_LOGOS: Record<string, string> = {
  "Rolls-Royce": "/car-brand/rolls-royce.svg",
  Ferrari: "/car-brand/ferrari-logo.svg",
  Lamborghini: "/car-brand/lamborghini-logo.svg",
  McLaren: "/car-brand/mclaren-logo.svg",
  Porsche: "/car-brand/porsche-logo.svg",
  Bentley: "/car-brand/bentley-logo.svg",
  "Mercedes-Benz": "/car-brand/mercedes-benz.svg",
  BYD: "/car-brand/byd.svg",
};

export const getBrandLogo = (brand: string): string | undefined =>
  BRAND_LOGOS[brand];
