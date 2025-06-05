export const metadata = {
  title: 'Shipping Information | GoalGear',
  description: 'Learn about our shipping options, delivery times, and policies for football gear and equipment.',
};

export default function ShippingInfoPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Options & Delivery Times</h2>
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-r border-gray-200 pr-6">
                  <h3 className="font-semibold mb-2">Standard Shipping</h3>
                  <p className="text-sm text-gray-600">3-7 business days</p>
                  <p className="text-sm text-gray-600 mt-1">$4.99 or FREE on orders over $50</p>
                </div>
                <div className="border-r border-gray-200 pr-6">
                  <h3 className="font-semibold mb-2">Express Shipping</h3>
                  <p className="text-sm text-gray-600">2-3 business days</p>
                  <p className="text-sm text-gray-600 mt-1">$14.99</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Overnight Shipping</h3>
                  <p className="text-sm text-gray-600">1-2 business days</p>
                  <p className="text-sm text-gray-600 mt-1">$24.99</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              *Delivery times are estimates and may be affected by factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
            <p className="mb-4">
              Orders are typically processed and shipped within 1-2 business days (Monday-Friday, excluding holidays). Orders placed after 2 PM EST will be processed the next business day.
            </p>
            <p>
              During peak seasons or sales events, processing times may be extended. You will receive a shipping confirmation email with tracking information once your order has been shipped.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
            <p className="mb-4">
              We currently ship to select countries worldwide. International delivery times vary by destination and typically take 7-21 business days after shipping.
            </p>
            <p className="mb-4">
              Please note that international orders may be subject to import taxes, customs duties, and fees, which are the responsibility of the recipient. These charges are not included in the item price or shipping cost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
            <p className="mb-4">
              Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can track your order using the link provided in the email or by visiting our <a href="/track-order" className="text-blue-600 hover:underline">Order Tracking</a> page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
            <p className="mb-4">
              Some items may have shipping restrictions based on your location. These restrictions will be noted on the product page. We currently do not ship to P.O. Boxes or APO/FPO addresses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Undeliverable Packages</h2>
            <p className="mb-4">
              If a package is returned to us as undeliverable, we will issue a refund for the product cost minus any return shipping fees. We will contact you using the information provided at checkout to resolve any delivery issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our shipping policies or need assistance with an order, please contact our customer service team at <a href="mailto:shipping@goalgear.com" className="text-blue-600 hover:underline">shipping@goalgear.com</a> or call us at (555) 123-4567.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
