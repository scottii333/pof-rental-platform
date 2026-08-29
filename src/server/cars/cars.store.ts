import "server-only";

import type { Car } from "@/shared/car";

const CARS: Car[] = [
  {
    id: "ghost",
    name: "Rolls-Royce Ghost",
    brand: "Rolls-Royce",
    category: "luxury",
    year: 2024,
    seats: 5,
    transmission: "automatic",
    imageUrl: "/car-model/rolls-royce.jpg",
    pricePerDay: 4500,
    available: true,
  },
  {
    id: "sf90-spyder",
    name: "Ferrari SF90 Spyder",
    brand: "Ferrari",
    category: "sports",
    year: 2024,
    seats: 2,
    transmission: "automatic",
    imageUrl: "/car-model/ferrari.jpg",
    pricePerDay: 9000,
    available: true,
  },
  {
    id: "huracan-evo",
    name: "Lamborghini Huracán EVO",
    brand: "Lamborghini",
    category: "sports",
    year: 2023,
    seats: 2,
    transmission: "automatic",
    imageUrl: "/car-model/lamborghini.jpg",
    pricePerDay: 8000,
    available: true,
  },
  {
    id: "720s",
    name: "McLaren 720S",
    brand: "McLaren",
    category: "sports",
    year: 2023,
    seats: 2,
    transmission: "automatic",
    imageUrl: "/car-model/mclaren.jpg",
    pricePerDay: 7500,
    available: true,
  },
  {
    id: "911-turbo-s",
    name: "Porsche 911 Turbo S",
    brand: "Porsche",
    category: "sports",
    year: 2024,
    seats: 4,
    transmission: "automatic",
    imageUrl: "/car-model/porsche.jpg",
    pricePerDay: 3500,
    available: true,
  },
  {
    id: "continental-gt",
    name: "Bentley Continental GT",
    brand: "Bentley",
    category: "luxury",
    year: 2023,
    seats: 4,
    transmission: "automatic",
    imageUrl: "/car-model/bently.jpg",
    pricePerDay: 4000,
    available: true,
  },
  {
    id: "s-class",
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    category: "sedan",
    year: 2024,
    seats: 5,
    transmission: "automatic",
    imageUrl: "/car-model/mercedes.jpg",
    pricePerDay: 2500,
    available: true,
  },
  {
    id: "shark-6",
    name: "BYD Shark 6",
    brand: "BYD",
    category: "suv",
    year: 2024,
    seats: 5,
    transmission: "automatic",
    imageUrl: "/car-model/byd-shark-6.jpg",
    pricePerDay: 1200,
    available: true,
  },
];

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export const carsStore = {
  async list(): Promise<Car[]> {
    return clone(CARS);
  },
  async listAvailable(): Promise<Car[]> {
    return clone(CARS.filter((car) => car.available));
  },
  async findById(id: string): Promise<Car | null> {
    const car = CARS.find((entry) => entry.id === id);
    return car ? clone(car) : null;
  },
};
