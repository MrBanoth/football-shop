"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

// Extend the Product type to include missing properties
type ExtendedProduct = Product & {
  discount?: number;
  featured?: boolean;
  createdAt?: string;
};
import ProductCard from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageBanner from "@/components/ui/image-banner"; // Import the new banner component

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [products, setProducts] = useState<ExtendedProduct[]>(productsData.products as ExtendedProduct[]);
  const [filteredProducts, setFilteredProducts] = useState<ExtendedProduct[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Placeholder images for the banner - replace with actual football-related images
  const bannerImages = [
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551958219-ff692f1c7059?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vdGJhbGwlMjBzdGFkaXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb3RiYWxsJTIwcGxheWVyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  ];

  // Filter products based on category, search query, and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (category !== "all") {
      if (category === "new-arrivals") {
        // Get products added in the last 30 days or mark all as new if no date
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        result = result.filter(product => {
          if (!product.createdAt) return true; // If no date, include in new arrivals
          return new Date(product.createdAt) > thirtyDaysAgo;
        });
      } else if (category === "sale") {
        // Get products that are on sale (discount > 0)
        result = result.filter(product => (product.discount || 0) > 0);
      } else if (category === "collections") {
        // Get featured products for collections
        result = result.filter(product => product.featured === true);
      } else {
        // Regular category filter
        result = result.filter((product) => product.category === category);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price * (1 - (a.discount || 0))) - (b.price * (1 - (b.discount || 0))));
        break;
      case "price-high":
        result.sort((a, b) => (b.price * (1 - (b.discount || 0))) - (a.price * (1 - (a.discount || 0))));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [products, category, searchQuery, sortBy]);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "new-arrivals", label: "New Arrivals" },
    { value: "sale", label: "Sale" },
    { value: "collections", label: "Collections" },
    { value: "jerseys", label: "Jerseys" },
    { value: "shoes", label: "Shoes" },
    { value: "balls", label: "Balls" },
    { value: "accessories", label: "Accessories" },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Shop</h1>
          </div>
          
          {/* Category Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 flex-nowrap">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={category === cat.value ? "default" : "outline"}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "whitespace-nowrap",
                    category === cat.value ? "font-semibold" : ""
                  )}
                >
                  {cat.label}
                  {cat.value === "sale" && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                      SALE
                    </span>
                  )}
                  {cat.value === "new-arrivals" && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold bg-blue-500 text-white rounded-full">
                      NEW
                    </span>
                  )}
                </Button>
              ))}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="flex-shrink-0 md:hidden">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter products by category and other criteria.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Category</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.value}
                          variant={
                            category === cat.value ? "default" : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() => setCategory(cat.value)}
                        >
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Auto-scrolling Image Banner */}
        <ImageBanner images={bannerImages} />

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Sort by:
            </span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}