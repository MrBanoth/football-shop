import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, Shield, Mail } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const orderId = params.orderId;

  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-gray-600">
          Your order #{orderId} has been received and is being processed.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 mb-8">
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
            <p className="text-gray-600">$0.00</p> {/* This would be dynamic in a real app */}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
            <p className="text-gray-600">Credit Card</p> {/* This would be dynamic */}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-3 mt-0.5">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Order Confirmation</p>
                <p className="text-sm text-gray-500">
                  We've sent a confirmation email with your order details and tracking information.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-3 mt-0.5">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Shipping Updates</p>
                <p className="text-sm text-gray-500">
                  You'll receive shipping updates as your order makes its way to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/profile/orders">View Order History</Link>
        </Button>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
