export interface Product {
  id: number;
  name: string;
  brand: string;
  slug: string;
  price: string;
  image: string;
  description?: string | null;
  stock: number;
}

