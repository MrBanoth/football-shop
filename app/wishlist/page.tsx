"use client";

import { Button } from "@/components/ui/button";
import { Heart, HeartOff, ShoppingCart, X } from "lucide-react";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 rounded-full bg-muted">
              <HeartOff className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Your wishlist is empty</h1>
            <p className="text-muted-foreground">
              Save items you love to your wishlist to keep track of them later.
            </p>
            <Button asChild className="mt-4">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 py-8 sm:py-12 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Wishlist</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={clearWishlist}
          className="text-muted-foreground"
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="group relative border rounded-lg overflow-hidden">
            <Link href={`/shop/${product.id}`} className="block">
              <div className="aspect-square relative bg-muted group">
                {product.images?.[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="font-semibold mt-1">{formatPrice(product.price)}</p>
              </div>
            </Link>
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                }}
                onMouseDown={(e) => {
                  // Prevent focus on button to avoid hover state sticking
                  e.preventDefault();
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove from wishlist</span>
              </Button>
            </div>
            
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
              onClick={(e) => {
                // Prevent click from bubbling up to the link
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {isInCart(product.id) ? (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-white text-foreground hover:bg-white/90"
                  asChild
                >
                  <Link href="/cart">View in Cart</Link>
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-white text-foreground hover:bg-white/90"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
