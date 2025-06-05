"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, User, MapPinIcon, CreditCard } from 'lucide-react';

// Interfaces (can be moved to a shared types file later)
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress?: {
    name: string;
    addressLine1: string;
    city: string;
    zip: string;
    country: string;
  };
  billingAddress?: {
    name: string;
    addressLine1: string;
    city: string;
    zip: string;
    country: string;
  };
  paymentMethod?: string;
}

// Helper to get status badge variant (consistent with order list page)
const getStatusBadgeVariant = (status: Order['status']): 'default' | 'secondary' | 'outline' | 'destructive' => {
  switch (status) {
    case 'Delivered': return 'default';
    case 'Shipped': return 'secondary';
    case 'Pending': return 'outline';
    case 'Cancelled': return 'destructive';
    default: return 'secondary';
  }
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const storedOrdersString = localStorage.getItem('mockOrders');
      if (storedOrdersString) {
        const storedOrders: Order[] = JSON.parse(storedOrdersString);
        // Add mock shipping/billing details to orders if not present for detail view
        const detailedOrders = storedOrders.map(o => ({
          ...o,
          shippingAddress: o.shippingAddress || {
            name: 'Sandeep Kumar',
            addressLine1: '123 Football Lane',
            city: 'Goal City',
            zip: '12345',
            country: 'Sportland'
          },
          billingAddress: o.billingAddress || {
            name: 'Sandeep Kumar',
            addressLine1: '123 Football Lane',
            city: 'Goal City',
            zip: '12345',
            country: 'Sportland'
          },
          paymentMethod: o.paymentMethod || 'Visa **** 1234'
        }));
        const foundOrder = detailedOrders.find(o => o.id === orderId);
        setOrder(foundOrder || null);
      }
    }
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Loading order details...</p></div>;
  }

  if (!order) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find an order with ID: {orderId}.</p>
        <Button asChild>
          <Link href="/profile/orders">Back to Order History</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="bg-card p-6 sm:p-8 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-6 border-b">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Order ID: {order.id}</h1>
            <p className="text-sm text-muted-foreground">Placed on: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <Badge variant={getStatusBadgeVariant(order.status)} className="mt-3 sm:mt-0 text-sm px-3 py-1.5 h-fit">
            {order.status}
          </Badge>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Package className="mr-3 h-6 w-6 text-primary" /> Items Ordered
          </h2>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-start sm:items-center gap-4 p-4 border rounded-md bg-background">
                {item.image ? (
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={80} 
                    height={80} 
                    className="rounded-md object-cover w-16 h-16 sm:w-20 sm:h-20"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-medium text-md">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="text-sm text-muted-foreground">Price per item: ${item.price.toFixed(2)}</p>
                </div>
                <p className="text-md font-semibold whitespace-nowrap">${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-background p-4 rounded-md border">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5 text-primary" /> Shipping Address
            </h3>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p className="font-medium text-card-foreground">{order.shippingAddress?.name}</p>
              <p>{order.shippingAddress?.addressLine1}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.zip}</p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>
          <div className="bg-background p-4 rounded-md border">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" /> Payment Information
            </h3>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p className="font-medium text-card-foreground">Payment Method</p>
              <p>{order.paymentMethod}</p>
              <p className="font-medium text-card-foreground mt-2">Billing Address</p>
              <p className="font-medium text-card-foreground">{order.billingAddress?.name}</p>
              <p>{order.billingAddress?.addressLine1}</p>
              <p>{order.billingAddress?.city}, {order.billingAddress?.zip}</p>
              <p>{order.billingAddress?.country}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 mt-6 text-right">
          <p className="text-sm text-muted-foreground">Subtotal: <span className="font-medium text-card-foreground">${/* Calculate subtotal if needed, or assume totalAmount includes everything */}</span></p>
          <p className="text-sm text-muted-foreground">Shipping: <span className="font-medium text-card-foreground">$0.00 (Mock)</span></p>
          <p className="text-lg font-bold text-primary mt-1">Order Total: ${order.totalAmount.toFixed(2)}</p>
        </div>

      </div>
    </div>
  );
}
