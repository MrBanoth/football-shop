export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: "jerseys" | "shoes" | "balls" | "accessories";
  sizes: string[];
  colors: string[];
  images: string[];
  rating: number;
  featured: boolean;
  stock: number;
};