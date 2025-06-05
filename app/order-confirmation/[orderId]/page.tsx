"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, Mail, Loader2, Package, Check, CreditCard, Home, History } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrderConfirmationPage({
  params,
  searchParams,
}: {
  params: { orderId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = params.orderId;
  const total = searchParams.total ? `$${parseFloat(searchParams.total as string).toFixed(2)}` : "$0.00";
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState('processing');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setOrderStatus('confirmed');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Preparing your order...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-12 max-w-4xl mx-auto px-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 125, damping: 20 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600">
          Your order <span className="font-semibold">#{orderId}</span> has been received and is being processed.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border p-6 md:p-8 mb-8"
      >
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Order Number</h3>
              <p className="text-gray-600">#{orderId}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Date</h3>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Total</h3>
              <p className="text-gray-600 font-medium">{total}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Credit Card</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-medium text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start p-4 bg-blue-50 rounded-lg"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-3 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmation</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We've sent a confirmation email with your order details and tracking information.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start p-4 bg-green-50 rounded-lg"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-3 mt-0.5">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-500 mt-1">
                    You'll receive shipping updates as your order makes its way to you.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Button asChild variant="outline" className="w-full group">
            <Link href="/profile/orders" className="flex items-center">
              <History className="mr-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              View Order History
            </Link>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Button asChild className="w-full group">
            <Link href="/shop" className="flex items-center">
              <Home className="mr-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              Back to Shop
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Add framer-motion variants for more complex animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
