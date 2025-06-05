'use client';

import { useEffect, useState } from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product-grid';
import { FilterSidebar } from '@/components/filter-sidebar';
import ProductCard from '@/components/ui/product-card';
import { getOnSale } from '@/lib/api/products';
import { Product } from '@/types';

// Mock data for products
const mockProducts: Product[] = [
  // Add some mock products here if needed
];


export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from your API
        // const data = await getOnSale();
        // setProducts(data);
        
        // Using mock data for now
        setProducts(mockProducts);
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
      {/* Sale Banner */}
      <div className="bg-gradient-to-br from-blue-900 to-black py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Tag className="w-10 h-10" />
          </div>
          <span className="inline-block bg-red-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
            LIMITED TIME OFFER
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Up to 50% Off</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Don't miss out on these amazing deals on football gear. Limited stock available!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold">On Sale Now</h2>
                <p className="text-muted-foreground">
                  {products.length} {products.length === 1 ? 'item' : 'items'} on sale
                </p>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 h-10 w-full md:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                >
                  <span>Sort By</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm h-96 animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <ProductGrid>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">No items on sale right now</h3>
                <p className="text-muted-foreground mb-6">Check back later for new deals!</p>
                <Button asChild>
                  <a href="/shop">View All Products</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
