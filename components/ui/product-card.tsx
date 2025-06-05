"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  featured = false, 
  className 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const alreadyInCart = isInCart(product.id);
  const isLiked = isInWishlist(product.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!alreadyInCart) {
      // For products with sizes, use the first size as default
      const defaultSize = product.sizes.length > 0 ? product.sizes[0] : undefined;
      // For products with colors, use the first color as default
      const defaultColor = product.colors.length > 0 ? product.colors[0] : undefined;
      
      addToCart(product, 1, defaultSize, defaultColor);
    }
  };

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <Link href={`/shop/${product.id}`} passHref className="h-full">
      <Card 
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col",
          featured ? "border-primary/10" : "",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-square overflow-hidden">
          {product.images.length > 0 && (
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={toggleLike}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isLiked ? "fill-red-500 text-red-500" : ""
                )}
              />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          
          {featured && (
            <Badge className="absolute top-3 left-3" variant="secondary">
              Featured
            </Badge>
          )}
          
          {product.stock <= 5 && product.stock > 0 && (
            <Badge 
              className="absolute bottom-3 left-3" 
              variant="destructive"
            >
              Low Stock
            </Badge>
          )}
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium truncate">{product.name}</h3>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {truncateText(product.description, 60)}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {product.category === "jerseys" && product.sizes && product.sizes.length > 0 && (
              <div className="flex gap-1">
                {product.sizes.slice(0, 3).map((size: string) => (
                  <div key={size} className="text-xs border rounded-full px-2 py-0.5">
                    {size}
                  </div>
                ))}
                {product.sizes.length > 3 && (
                  <div className="text-xs border rounded-full px-2 py-0.5">
                    +{product.sizes.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="text-lg font-semibold">{formatPrice(product.price)}</div>
        </CardContent>
        
        <CardFooter className="p-4 mt-auto">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="space-y-1">
                <h3 className="font-medium text-sm sm:text-base line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {formatPrice(product.price)}
                </p>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
                onClick={handleAddToCart}
              >
                {alreadyInCart ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {alreadyInCart ? 'Added to cart' : 'Add to cart'}
                </span>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;