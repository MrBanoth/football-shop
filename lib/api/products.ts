import productsData from '@/data/products.json';
import { Product } from '@/types';

// Extend the Product type with additional properties
type ExtendedProduct = Product & {
  discount?: number;
  featured?: boolean;
  createdAt?: string;
};

export async function getNewArrivals(): Promise<ExtendedProduct[]> {
  // In a real app, this would be an API call
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return (productsData.products as ExtendedProduct[]).filter(product => {
    if (!product.createdAt) return true; // If no date, include in new arrivals
    return new Date(product.createdAt) > thirtyDaysAgo;
  });
}

export async function getOnSale(): Promise<ExtendedProduct[]> {
  // In a real app, this would be an API call
  return (productsData.products as ExtendedProduct[]).filter(
    product => (product.discount || 0) > 0
  );
}

export async function getFeaturedCollections(): Promise<ExtendedProduct[]> {
  // In a real app, this would be an API call
  return (productsData.products as ExtendedProduct[]).filter(
    product => product.featured === true
  );
}
