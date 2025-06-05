"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import productsData from "@/data/products.json";
import { useCart } from "@/context/cart-context";
import FeaturedProducts from "@/components/ui/featured-products";
import { Product } from "@/types";

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  
  // Find the product based on the ID
  const productData = productsData.products.find(
    (p) => p.id === parseInt(params.id)
  );

  // Handle product not found
  if (!productData) {
    notFound();
  }

  // Ensure the product data matches the Product type
  const product: Product = {
    id: productData.id,
    name: productData.name,
    price: productData.price,
    description: productData.description,
    category: productData.category as "jerseys" | "shoes" | "balls" | "accessories",
    sizes: productData.sizes || [],
    colors: productData.colors || [],
    images: productData.images || [],
    rating: productData.rating || 0,
    featured: productData.featured || false,
    stock: productData.stock || 0
  };

  // Get related products (same category)
  const relatedProducts = productsData.products
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);

  // State for product options
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors.length > 0 ? product.colors[0] : undefined
  );

  // Check if product is already in cart
  const alreadyInCart = isInCart(product.id);

  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!alreadyInCart && product.stock > 0) {
      addToCart(product, quantity, selectedSize, selectedColor);
    }
  };

  return (
    <div className="container py-12">
      <Button
        variant="ghost"
        className="mb-6 inline-flex items-center"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-md border ${
                    selectedImage === index
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 10vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} / 5.0
              </span>
            </div>
            <div className="mt-4 text-2xl font-semibold">
              {formatPrice(product.price)}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Select Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="grid grid-cols-4 sm:grid-cols-6 gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 w-full items-center justify-center rounded-md border border-muted bg-popover p-2 text-center font-medium peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Select Color</h3>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="grid grid-cols-4 sm:grid-cols-6 gap-2"
                >
                  {product.colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem
                        value={color}
                        id={`color-${color}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex h-10 w-full items-center justify-center rounded-md border border-muted bg-popover p-2 text-center font-medium peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-medium mb-4">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || alreadyInCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock === 0
                  ? "Out of Stock"
                  : alreadyInCart
                  ? "Already in Cart"
                  : "Add to Cart"}
              </Button>
              {product.stock <= 5 && product.stock > 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Only {product.stock} left in stock!
                </p>
              )}
            </div>
          </div>

          {/* Product Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $150. Standard delivery 3-5 days.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Returns</h4>
                <p className="text-sm text-muted-foreground">
                  30-day easy returns if you change your mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <FeaturedProducts
            products={relatedProducts}
            title="You Might Also Like"
          />
        </div>
      )}
    </div>
  );
}