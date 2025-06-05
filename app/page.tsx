import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/ui/featured-products";
import products from "@/data/products.json";
import { Product } from "@/types";

export default function Home() {
  // Get first 4 featured products with proper typing
  const featuredProducts = products.products
    .filter((product) => product.featured)
    .slice(0, 4) as unknown as Product[];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-900 to-black">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="md:w-1/2 md:pr-12">
              <div className="md:pl-4">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Elevate Your Game
                </h1>
                <p className="mt-4 text-xl text-gray-200 md:mt-6 md:text-2xl">
                  Premium football gear trusted by professionals and enthusiasts around the world. Crafted for champions.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="font-medium bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="text-white border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300 shadow-lg hover:shadow-xl/30"
                  >
                    <Link href="/about" className="flex items-center gap-2">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Image with Floating Animation */}
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <div className="relative w-full max-w-md h-80 md:h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/football-hero.png"
                  alt="Football gear"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <Suspense fallback={<div>Loading products...</div>}>
        <FeaturedProducts products={featuredProducts} />
      </Suspense>

      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Shop By Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Jerseys",
                image: "https://images.pexels.com/photos/9369711/pexels-photo-9369711.jpeg",
                href: "/shop?category=jerseys",
              },
              {
                name: "Shoes",
                image: "https://images.pexels.com/photos/8224417/pexels-photo-8224417.jpeg",
                href: "/shop?category=shoes",
              },
              {
                name: "Balls",
                image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg",
                href: "/shop?category=balls",
              },
              {
                name: "Accessories",
                image: "https://images.pexels.com/photos/6202911/pexels-photo-6202911.jpeg",
                href: "/shop?category=accessories",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-square relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <div className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Shop Now</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Truck className="mx-auto h-10 w-10 mb-4 text-primary" />,
                title: "Fast Shipping",
                description: "Free worldwide shipping on all orders over $150",
              },
              {
                icon: <ShieldCheck className="mx-auto h-10 w-10 mb-4 text-primary" />,
                title: "Authentic Products",
                description: "100% authentic merchandise guaranteed",
              },
              {
                icon: <CreditCard className="mx-auto h-10 w-10 mb-4 text-primary" />,
                title: "Secure Payment",
                description: "Multiple secure payment methods accepted",
              },
              {
                icon: (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="mx-auto h-10 w-10 mb-4 text-primary" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                ),
                title: "Customer Support",
                description: "24/7 dedicated customer support team",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                {feature.icon}
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container text-center py-8">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Sign up for our newsletter to receive exclusive offers, early access to new products, and professional football tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md flex-1 bg-primary-foreground text-primary"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}