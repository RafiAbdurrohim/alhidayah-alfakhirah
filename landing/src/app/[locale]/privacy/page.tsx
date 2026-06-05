"use client";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-dark pt-28 pb-20">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12">
          <span className="eyebrow block mb-4">Legal</span>
          <div className="gold-line w-16 mb-6" />
          <h1 className="font-display text-[clamp(36px,4vw,56px)] font-light text-cream leading-[1.1] mb-4">
            Privacy <em className="italic text-gold-light">Policy</em>
          </h1>
          <p className="text-[14px] text-muted">Last updated: April 1, 2026</p>
        </div>

        <div className="space-y-10 text-[15px] text-muted leading-[1.85]">

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">1. Introduction</h2>
            <p>
              Masar Alhidayah Company Ltd ("we", "our", or "us"), registered in Makkah Al-Mukarramah, Saudi Arabia
              (Entity ID: 1505308, Investment Registration No. 24926247795), operates the Masar Alhidayah mobile
              application and website. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your personal information when you use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li><span className="text-cream">Personal Identification:</span> Name, phone number, and email address provided during registration.</li>
              <li><span className="text-cream">Location Data:</span> Your delivery address and current location to provide accurate delivery and service estimates.</li>
              <li><span className="text-cream">Order History:</span> Details of orders placed, including items, prices, and delivery addresses.</li>
              <li><span className="text-cream">Payment Information:</span> Payment is processed securely via Moyasar. We do not store full card details on our servers.</li>
              <li><span className="text-cream">Device Information:</span> Device type, operating system, and app usage data for service improvement.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li>To process and fulfill your orders and service requests</li>
              <li>To send order confirmations, updates, and notifications via SMS or push notifications</li>
              <li>To improve our app, services, and customer experience</li>
              <li>To comply with legal obligations under Saudi law</li>
              <li>To contact you regarding your account or service changes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">4. Information Sharing</h2>
            <p className="mb-4">We do not sell your personal data. We may share your information with:</p>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li><span className="text-cream">Service Providers:</span> Delivery drivers and service teams who fulfill your orders.</li>
              <li><span className="text-cream">Payment Processors:</span> Moyasar Payment Gateway for secure payment processing.</li>
              <li><span className="text-cream">Legal Authorities:</span> When required by Saudi Arabian law or court order.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">5. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide services.
              You may request deletion of your account and associated data by contacting us at the email below.
              We will process your request within 30 days, subject to legal retention requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">6. Security</h2>
            <p>
              We implement industry-standard security measures including SSL encryption, Firebase security rules,
              and secure payment processing via Moyasar to protect your personal information. However, no method
              of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">7. Your Rights</h2>
            <p className="mb-4">Under applicable Saudi data protection regulations, you have the right to:</p>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">8. Contact Us</h2>
            <p>
              For any privacy-related questions or requests, please contact us at:<br />
              <span className="text-gold">info@masaralhidayah.com</span><br />
              Masar Alhidayah Co. Ltd, Makkah Al-Mukarramah, Saudi Arabia
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
