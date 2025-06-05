export const metadata = {
  title: 'Privacy Policy | GoalGear',
  description: 'Learn how GoalGear collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: June 4, 2025</p>
        
        <div className="space-y-8">
          <section>
            <p className="mb-4">
              At GoalGear, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">We collect several types of information from and about users of our website, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Personal information such as name, email address, phone number, and shipping/billing address</li>
              <li>Payment information (processed securely through our payment processor)</li>
              <li>Order history and purchase information</li>
              <li>Account credentials and preferences</li>
              <li>Browsing behavior and website usage data</li>
              <li>Device and connection information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Personalize your shopping experience</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Service providers who assist with our business operations (e.g., payment processing, shipping, marketing)</li>
              <li>Business partners for co-branded services or promotions (with your consent)</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Successor entities in the event of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience, analyze site usage, and deliver personalized advertising. You can control cookies through your browser settings, but disabling them may affect certain website features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access, update, or delete your personal information</li>
              <li>Restrict or object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent (where applicable)</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p>To exercise these rights, please contact us using the information below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under 16. We do not knowingly collect personal information from children under 16 without parental consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@goalgear.com<br />
              Phone: (555) 123-4567<br />
              Mail: 123 Soccer Way, Football City, FC 12345, USA
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
