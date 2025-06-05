// Base product interface with all possible properties
export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  sizes?: string[];
  colors?: string[];
  images: string[];
  rating?: number;
  featured?: boolean;
  stock?: number;
  discount?: number;
  createdAt?: string;
  [key: string]: any; // Allow additional properties
}

// Product type that enforces required fields
export type Product = Required<Pick<BaseProduct, 'id' | 'name' | 'price' | 'description' | 'category' | 'images' | 'stock'>> & 
  Partial<Omit<BaseProduct, 'id' | 'name' | 'price' | 'description' | 'category' | 'images' | 'stock'>>;