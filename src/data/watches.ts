export interface Watch {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: string;
  isLimited?: boolean;
  description: string;
  image: string; // Main thumbnail (e.g., "apex-front.jpg")
  images: string[]; // Gallery array
  specs: {
    movement: string;
    case: string;
    diameter: string;
    waterResistance: string;
  };
}


