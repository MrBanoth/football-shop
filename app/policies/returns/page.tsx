export const metadata = {
  title: 'Returns & Refunds Policy | GoalGear',
  description: 'Learn about our return and refund policy for football gear and equipment.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">Returns & Refunds Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">30-Day Return Policy</h2>
            <p className="mb-4">
              We offer a 30-day return policy from the date of delivery. If you're not completely satisfied with your purchase, you may return eligible items for a full refund or exchange.
            </p>
            <p>
              To be eligible for a return, your item must be unused, in the same condition that you received it, in its original packaging, and with all tags attached.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Log in to your account and go to Order History</li>
              <li>Select the item(s) you wish to return</li>
              <li>Choose a return reason and print the return label</li>
              <li>Package your return and attach the label</li>
              <li>Drop off at your nearest shipping location</li>
            </ol>
            <p>
              Once we receive your return, we'll process it within 3-5 business days. You'll receive an email notification once your return has been processed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Information</h2>
            <p className="mb-4">
              Refunds will be issued to the original payment method. Please allow 5-10 business days for the refund to appear on your credit card or bank statement.
            </p>
            <p>
              Please note that shipping charges are non-refundable, and return shipping costs are the responsibility of the customer unless the return is due to our error.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <p className="mb-4">
              To exchange an item, please return the original item for a refund and place a new order for the desired item. This ensures you receive your new item as quickly as possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
            <p className="mb-4">
              If you receive a damaged or defective item, please contact our customer service team within 7 days of delivery. We'll provide a prepaid return label and process a replacement or refund once we receive the returned item.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Final Sale Items</h2>
            <p>
              Items marked as "Final Sale" are not eligible for return or exchange unless they arrive damaged or defective.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our Returns & Refunds Policy, please contact our customer service team at support@goalgear.com or call us at (555) 123-4567.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
