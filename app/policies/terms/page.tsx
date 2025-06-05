export const metadata = {
  title: 'Terms of Service | GoalGear',
  description: 'Read our Terms of Service for using the GoalGear website and purchasing our products.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: June 5, 2025</p>
        
        <div className="space-y-8">
          <section>
            <p className="mb-4">
              Welcome to GoalGear! These Terms of Service ("Terms") govern your access to and use of the GoalGear website (the "Site") and the services provided by GoalGear ("we," "us," or "our").
            </p>
            <p>
              By accessing or using our Site, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Account Registration</h2>
            <p className="mb-4">You may be required to create an account to access certain features of our Site. You agree to provide accurate, current, and complete information during registration and to update such information as needed.</p>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Products and Pricing</h2>
            <p className="mb-4">We make every effort to display our products and their prices as accurately as possible. However, we cannot guarantee that your device's display will be accurate.</p>
            <p className="mb-4">We reserve the right to modify or discontinue any product at any time without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of any product.</p>
            <p>All prices are in USD and do not include taxes or shipping charges, which will be calculated at checkout.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Orders and Payment</h2>
            <p className="mb-4">By placing an order through our Site, you agree to pay all charges, including applicable taxes and shipping fees. We accept various payment methods as indicated on our Site.</p>
            <p>We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspicion of fraudulent activity.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
            <p className="mb-4">Shipping times and rates are estimates only and are not guaranteed. We are not responsible for any delays caused by shipping carriers or other factors beyond our control.</p>
            <p>Please refer to our <a href="/policies/shipping" className="text-blue-600 hover:underline">Shipping Information</a> page for more details.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
            <p className="mb-4">Our return policy is outlined in our <a href="/policies/returns" className="text-blue-600 hover:underline">Returns & Refunds Policy</a>. By placing an order, you agree to be bound by these policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="mb-4">All content on our Site, including but not limited to text, graphics, logos, images, and software, is the property of GoalGear or its content suppliers and is protected by intellectual property laws.</p>
            <p>You may not reproduce, distribute, modify, or create derivative works from any content on our Site without our prior written consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Use our Site for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the integrity or performance of our Site</li>
              <li>Attempt to gain unauthorized access to our Site or related systems</li>
              <li>Use any robot, spider, or other automated means to access our Site</li>
              <li>Submit false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">To the fullest extent permitted by law, GoalGear shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p>You agree to indemnify and hold harmless GoalGear and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses arising out of your use of our Site or violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to These Terms</h2>
            <p className="mb-4">We reserve the right to modify these Terms at any time. We will notify you of any changes by updating the "Last updated" date at the top of this page.</p>
            <p>Your continued use of our Site after any changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              Email: legal@goalgear.com<br />
              Phone: (555) 123-4567<br />
              Mail: 123 Soccer Way, Football City, FC 12345, USA
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
