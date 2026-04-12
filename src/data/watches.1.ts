// 1. The Blueprint (Interface)
export interface Watch {
  
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: string;
  isLimited?: boolean;
  description: string;
  image: string; 
  images: string[]; 
  specs: {
    movement: string;
    case: string;
    diameter: string;
    waterResistance: string;
  };
}

// 2. The Data Array - Explicitly typed as Watch[]
export const watches: Watch[] = [
  {
    id: 1,
    slug: "apex-skeleton",
    name: "Apex Skeleton",
    brand: "Chronos Tech",
    price: "$28,500",
    isLimited: true,
    description: "A mechanical masterpiece featuring a fully exposed movement, housing 21 jewels within a Grade 5 Titanium case.",
    image: "apex-front.jpg", 
    images: ["apex-front.jpg", "apex-side.jpg", "apex-back.jpg"],
    specs: {
      movement: "Skeletonized P.9001",
      case: "Forged Carbon",
      diameter: "44mm",
      waterResistance: "300m"
    }
  },
  {
    id: 2,
    slug: "luna-phase",
    name: "Luna Phase",
    brand: "Chronos Heritage",
    price: "$38,000",
    isLimited: false,
    description: "Capturing the celestial dance of the moon with a mother-of-pearl dial and white gold casing.",
    image: "luna-front.jpg",
    images: ["luna-front.jpg", "luna-detail.jpg", "luna-back.jpg"],
    specs: {
      movement: "Automatic Moonphase",
      case: "18k White Gold",
      diameter: "40mm",
      waterResistance: "50m"
    }
  },
  {
    id: 3,
    slug: "silver-oak",
    name: "Silver Oak Chronograph",
    brand: "Chronos Heritage",
    price: "$12,400",
    isLimited: true,
    description: "A masterpiece of Swiss engineering featuring a brushed steel finish and hand-stitched leather.",
    image: "watch1.jpg",
    images: ["watch1.jpg"],
    specs: {
      movement: "Automatic Calibre 4130",
      case: "Oystersteel",
      diameter: "40mm",
      waterResistance: "100m"
    }
  },
  {
    id: 4,
    slug: "midnight-tourbillon",
    name: "Midnight Tourbillon",
    brand: "Chronos Lux",
    price: "$45,000",
    isLimited: false,
    description: "The peak of horological excellence with a deep obsidian dial and floating tourbillon cage.",
    image: "watch2.jpg",
    images: ["watch2.jpg"],
    specs: {
      movement: "Manual Wind Tourbillon",
      case: "18k White Gold",
      diameter: "42mm",
      waterResistance: "50m"
    }
  },
  {
    id: 5,
    slug: "royal-titanium",
    name: "Royal Titanium",
    brand: "Chronos Lux",
    price: "$38,000",
    isLimited: false,
    description: "The ultimate expression of durability and lightweight luxury, crafted for the modern explorer.",
    image: "richard-front.jpg",
    images: ["richard-front.jpg", "luna-detail.jpg", "luna-back.jpg"],
    specs: {
      movement: "Automatic Moonphase",
      case: "18k White Gold",
      diameter: "40mm",
      waterResistance: "50m"
    }
  },
];

// 3. Helper to find a watch by its slug
export const getWatchBySlug = (slug: string) => {
  return watches.find((w) => w.slug === slug);
};