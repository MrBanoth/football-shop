"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // For order status
import { ShoppingBag } from 'lucide-react'; // Icon for empty state

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string; // Optional image for the product
}

interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  items: OrderItem[];
}

const getMockOrders = (): Order[] => {
  const mockOrders: Order[] = [
    {
      id: 'ORD001',
      date: '2024-05-15',
      status: 'Delivered',
      totalAmount: 125.99,
      items: [
        { id: 'prod1', name: 'Premium Football Boots', quantity: 1, price: 89.99, image: '/images/products/boot1.jpg' },
        { id: 'prod2', name: 'Shin Guards', quantity: 1, price: 15.50, image: '/images/products/shinguard1.jpg' },
        { id: 'prod3', name: 'Football Socks', quantity: 2, price: 10.25, image: '/images/products/socks1.jpg' },
      ],
    },
    {
      id: 'ORD002',
      date: '2024-05-28',
      status: 'Shipped',
      totalAmount: 75.00,
      items: [
        { id: 'prod4', name: 'Official Match Ball', quantity: 1, price: 45.00, image: '/images/products/ball1.jpg' },
        { id: 'prod5', name: 'Goalkeeper Gloves', quantity: 1, price: 30.00, image: '/images/products/gloves1.jpg' },
      ],
    },
    {
      id: 'ORD003',
      date: '2024-06-01',
      status: 'Pending',
      totalAmount: 30.75,
      items: [
        { id: 'prod6', name: 'Training Cones (Set of 10)', quantity: 1, price: 12.00, image: '/images/products/cones1.jpg' },
        { id: 'prod7', name: 'Water Bottle', quantity: 1, price: 8.75, image: '/images/products/bottle1.jpg' },
        { id: 'prod2', name: 'Shin Guards', quantity: 1, price: 10.00, image: '/images/products/shinguard2.jpg' },
      ],
    },
  ];
  // Store in localStorage if not already there (for persistence during session)
  if (!localStorage.getItem('mockOrders')) {
    localStorage.setItem('mockOrders', JSON.stringify(mockOrders));
  }
  return JSON.parse(localStorage.getItem('mockOrders') || '[]');
};

const getStatusBadgeVariant = (status: Order['status']): 'default' | 'secondary' | 'outline' | 'destructive' => {
  switch (status) {
    case 'Delivered': return 'default'; // Typically a positive/primary color
    case 'Shipped': return 'secondary';
    case 'Pending': return 'outline';
    case 'Cancelled': return 'destructive';
    default: return 'secondary';
  }
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getMockOrders());
  }, []);

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-1">Order History</h2>
        <p className="text-sm text-muted-foreground mb-6">
          View your past orders and their details.
        </p>
        <div className="border rounded-lg p-12 text-center flex flex-col items-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't placed any orders. When you do, they'll appear here.
          </p>
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Order History</h2>
      <p className="text-sm text-muted-foreground mb-6">
        View your past orders and their details.
      </p>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">Order ID: {order.id}</h3>
                <p className="text-sm text-muted-foreground">Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <Badge variant={getStatusBadgeVariant(order.status)} className="mt-2 sm:mt-0 text-xs px-2.5 py-1 h-fit">
                {order.status}
              </Badge>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium">Total: <span className="font-bold text-lg">${order.totalAmount.toFixed(2)}</span></p>
              <p className="text-xs text-muted-foreground">{order.items.length} item(s)</p>
            </div>
            {/* Preview of items - could be more detailed */}
            <div className="mb-4 space-y-2">
              {order.items.slice(0, 2).map(item => (
                <div key={item.id} className="flex items-center text-xs text-muted-foreground">
                  <span className="truncate w-3/4">{item.name} (x{item.quantity})</span>
                  <span className="ml-auto font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {order.items.length > 2 && <p className="text-xs text-muted-foreground">+ {order.items.length - 2} more item(s)</p>}
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href={`/profile/orders/${order.id}`}>View Details</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
