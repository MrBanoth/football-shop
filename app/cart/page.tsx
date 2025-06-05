"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Trash2, CreditCard, CheckCircle2, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import confetti from 'canvas-confetti';
// Toast notifications removed as per user request

export default function CartPage() {
  const router = useRouter();
  // Toast functionality removed as per user request
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'applied' | 'invalid'>('idle');
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);
  const applyButtonRef = useRef<HTMLButtonElement>(null);

  // Handle quantity changes
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Handle promo code
  const applyPromoCode = () => {
    const trimmedPromoCode = promoCode.trim().toLowerCase();
    if (trimmedPromoCode === "sandeep") {
      setPromoStatus('applied');
      setPromoFeedback('Promo code "sandeep" applied!');
      setPromoCode(""); // Clear input after applying
      // Here you would typically apply the discount to the cart total
      if (applyButtonRef.current) {
        const rect = applyButtonRef.current.getBoundingClientRect();
        const originX = (rect.left + rect.right) / 2 / window.innerWidth;
        const originY = (rect.top + rect.bottom) / 2 / window.innerHeight;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: originX, y: originY },
          colors: ['#FFC700', '#FF0000', '#2E3192', '#48BB78'] // Example colors
        });
      }
    } else if (trimmedPromoCode !== "") {
      setPromoStatus('invalid');
      setPromoFeedback('Invalid promo code.');
    } else {
      setPromoStatus('idle');
      setPromoFeedback(null);
    }
    setTimeout(() => { // Clear feedback message after a few seconds
      setPromoFeedback(null);
      if (trimmedPromoCode !== "sandeep" && trimmedPromoCode !== "") setPromoStatus('idle');
    }, 3000);
  };

  // Handle checkout with animations
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      // Generate a random order ID
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Get cart items before clearing
      const orderItems = [...cartItems];
      const orderTotal = getCartTotal();
      const orderShipping = orderTotal > 150 ? 0 : 10;
      
      // Clear cart after successful checkout
      clearCart();
      
      // Navigate to order confirmation page with order details
      router.push(`/order-confirmation/${orderId}?total=${orderTotal + orderShipping}`);
      setIsCheckingOut(false);
    }, 2000);
  };

  // Calculate order summary
  const subtotal = getCartTotal();
  const shipping = subtotal > 150 ? 0 : 10;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100px, 128px"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">
                      <Link 
                        href={`/shop/${item.product.id}`}
                        className="hover:underline"
                      >
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 space-x-2">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </p>
                    <p className="mt-1 font-medium">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>

                <div className="flex items-center mt-auto pt-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                  <span className="ml-auto font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button
                  ref={applyButtonRef}
                  variant={promoStatus === 'applied' ? 'default' : 'outline'}
                  onClick={applyPromoCode}
                  disabled={!promoCode.trim() || promoStatus === 'applied'}
                  className={`transition-all duration-300 ease-in-out ${promoStatus === 'applied' ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                >
                  {promoStatus === 'applied' ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Applied
                    </>
                  ) : (
                    'Apply'
                  )}
                </Button>
              </div>

              {promoFeedback && (
                <div
                  className={`mt-2 text-sm flex items-center transition-all duration-500 ease-out 
                    ${promoStatus === 'applied' ? 'text-green-600' : promoStatus === 'invalid' ? 'text-red-500' : 'text-muted-foreground'}
                    opacity-100 translate-y-0`}
                  // For a fade-in effect, you might need to manage opacity with state if not using a library
                >
                  {promoStatus === 'applied' && <CheckCircle2 className="h-4 w-4 mr-1.5 flex-shrink-0" />}
                  {promoFeedback}
                </div>
              )}
              
              <Button
                className={`w-full transition-all duration-300 ${isCheckingOut ? 'opacity-90' : ''}`}
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" /> Checkout
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Taxes calculated at checkout. Free shipping on orders over $150.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}