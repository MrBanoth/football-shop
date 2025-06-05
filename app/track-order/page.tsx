"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Truck, CheckCircle, Package, Clock } from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<{
    status: 'not-found' | 'delivered' | 'shipped' | 'processing' | null;
    orderId: string;
    estimatedDelivery?: string;
  } | null>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to fetch tracking info
    // For demo purposes, we'll simulate a response
    if (orderId.trim() === '') return;
    
    // Simulate API call
    setTimeout(() => {
      // This is mock data - in a real app, you'd get this from your backend
      const statuses: Array<'delivered' | 'shipped' | 'processing'> = ['delivered', 'shipped', 'processing'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setTrackingInfo({
        status: randomStatus,
        orderId: orderId,
        estimatedDelivery: randomStatus === 'processing' 
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
          : randomStatus === 'shipped'
            ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
            : undefined
      });
    }, 1000);
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          title: 'Delivered',
          description: 'Your order has been delivered.',
          icon: <CheckCircle className="h-6 w-6 text-green-600" />,
          color: 'bg-green-100 text-green-800',
        };
      case 'shipped':
        return {
          title: 'Shipped',
          description: 'Your order is on the way!',
          icon: <Truck className="h-6 w-6 text-blue-600" />,
          color: 'bg-blue-100 text-blue-800',
        };
      case 'processing':
        return {
          title: 'Processing',
          description: 'We\'re preparing your order.',
          icon: <Package className="h-6 w-6 text-yellow-600" />,
          color: 'bg-yellow-100 text-yellow-800',
        };
      default:
        return {
          title: 'Order Not Found',
          description: 'We couldn\'t find an order with that ID.',
          icon: <Clock className="h-6 w-6 text-gray-600" />,
          color: 'bg-gray-100 text-gray-800',
        };
    }
  };

  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
        <p className="text-lg text-gray-600">
          Enter your order number to check the status of your order
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 mb-8">
        <form onSubmit={handleTrackOrder} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter your order number"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>
            <Button type="submit" className="h-12 px-6">
              <Search className="mr-2 h-4 w-4" />
              Track Order
            </Button>
          </div>
        </form>

        {trackingInfo && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Order #{trackingInfo.orderId}</h2>
              <p className="text-gray-600">
                {trackingInfo.estimatedDelivery && `Estimated Delivery: ${trackingInfo.estimatedDelivery}`}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className={`p-4 rounded-lg ${getStatusDetails(trackingInfo.status || 'not-found').color} flex items-start`}>
                <div className="flex-shrink-0 mr-3">
                  {getStatusDetails(trackingInfo.status || 'not-found').icon}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {getStatusDetails(trackingInfo.status || 'not-found').title}
                  </h3>
                  <p className="text-sm">
                    {getStatusDetails(trackingInfo.status || 'not-found').description}
                  </p>
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="mt-8 space-y-4">
                <h4 className="font-medium text-gray-900 mb-4">Order Status</h4>
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {/* Timeline Items */}
                  <div className="relative pl-10 pb-6">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="font-medium">Order Placed</div>
                    <div className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>

                  <div className={`relative pl-10 pb-6 ${['shipped', 'delivered'].includes(trackingInfo.status || '') ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${['shipped', 'delivered'].includes(trackingInfo.status || '') ? 'bg-blue-100' : 'bg-gray-100'} flex items-center justify-center`}>
                      <Truck className={`h-4 w-4 ${['shipped', 'delivered'].includes(trackingInfo.status || '') ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="font-medium">Shipped</div>
                    <div className="text-sm text-gray-500">
                      {trackingInfo.status === 'processing' ? 'Pending' : 'Shipped on ' + new Date().toLocaleDateString()}
                    </div>
                  </div>

                  <div className={`relative pl-10 ${trackingInfo.status === 'delivered' ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${trackingInfo.status === 'delivered' ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center`}>
                      <CheckCircle className={`h-4 w-4 ${trackingInfo.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="font-medium">Delivered</div>
                    <div className="text-sm text-gray-500">
                      {trackingInfo.status === 'delivered' ? 'Delivered on ' + new Date().toLocaleDateString() : 'In transit'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">Need help with your order?</p>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
