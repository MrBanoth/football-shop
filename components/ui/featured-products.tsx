"use client";

import React from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ui/product-card";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
}

export default function FeaturedProducts({ 
  products, 
  title = "Featured Products" 
}: FeaturedProductsProps) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard 
                product={product} 
                featured={product.featured} 
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}