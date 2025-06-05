'use client';

import { useEffect, useState } from 'react';
import { Trophy, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product-grid';
import { FilterSidebar } from '@/components/filter-sidebar';
import ProductCard from '@/components/ui/product-card';
import { getFeaturedCollections } from '@/lib/api/products';
import { Product } from '@/types';

// Mock data for products
const mockProducts: Product[] = [
  // Add some mock products here if needed
];

const collections = [
  {
    id: 'premier-league',
    name: 'Premier League',
    description: 'Official jerseys and merchandise from the English Premier League',
    icon: Trophy,
    color: 'bg-red-600',
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    description: 'Gear from Spanish football clubs',
    icon: Star,
    color: 'bg-yellow-500',
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    description: 'Italian football club merchandise',
    icon: Shield,
    color: 'bg-blue-600',
  },
];

export default function CollectionsPage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from your API
        // const data = await getFeaturedCollections();
        // setFeaturedProducts(data);
        
        // Using mock data for now
        setFeaturedProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-black py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Collections</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Discover our curated selection of football gear from top leagues and teams
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Collections */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div 
                key={collection.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className={`h-1.5 ${collection.color}`}></div>
                <div className="p-6">
                  <div className={`${collection.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}>
                    <collection.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{collection.name}</h3>
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  >
                    View Collection
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600">
                Handpicked selection of premium football gear
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-900"
            >
              View All Products
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm h-96 animate-pulse" />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <ProductGrid>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">No featured products available</h3>
              <p className="text-muted-foreground mb-6">Check back soon for new collections!</p>
              <Button asChild>
                <a href="/shop">View All Products</a>
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
