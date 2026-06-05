"use client";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-dark pt-28 pb-20">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12">
          <span className="eyebrow block mb-4">Legal</span>
          <div className="gold-line w-16 mb-6" />
          <h1 className="font-display text-[clamp(36px,4vw,56px)] font-light text-cream leading-[1.1] mb-4">
            Terms of <em className="italic text-gold-light">Service</em>
          </h1>
          <p className="text-[14px] text-muted">Last updated: April 1, 2026</p>
        </div>

        <div className="space-y-10 text-[15px] text-muted leading-[1.85]">

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Masar Alhidayah application or website, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use our services. These terms are governed by
              the laws of the Kingdom of Saudi Arabia.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">2. Our Services</h2>
            <p className="mb-4">Masar Alhidayah provides the following services in Makkah Al-Mukarramah and Madinah:</p>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li><span className="text-cream">Go Food:</span> Food and beverage delivery, Hajj &amp; Umroh souvenirs</li>
              <li><span className="text-cream">Go Tours:</span> Ziyarah tour packages in Makkah and Madinah</li>
              <li><span className="text-cream">Go Shopping:</span> Personal shopping assistance</li>
              <li><span className="text-cream">Go Massage / Go Therapy:</span> In-location massage and therapy services</li>
              <li><span className="text-cream">Go Cargo:</span> Cargo and delivery services (local, domestic, international)</li>
              <li><span className="text-cream">Go Beauty:</span> In-location beauty and grooming services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">3. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our services. By using Masar Alhidayah, you confirm that
              you are 18 years of age or older and have the legal capacity to enter into a binding agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">4. Ordering & Payment</h2>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li>All prices are displayed in Saudi Riyal (SAR) and are exclusive of 15% VAT.</li>
              <li>Payment is processed securely through Moyasar Payment Gateway via credit/debit card.</li>
              <li>For Go Services (Massage, Cargo, Beauty, Tours): orders require admin confirmation before payment is charged.</li>
              <li>Orders must be placed at least one day in advance (H-1) for all Go Services.</li>
              <li>Cash on Delivery (COD) is available for food orders only.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">5. Cancellations & Refunds</h2>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li>Food orders: cancellation is allowed before the order is processed by our team.</li>
              <li>Go Services: cancellation is allowed before admin confirmation. After confirmation, cancellation requests are reviewed case by case.</li>
              <li>Refunds for valid cancellations will be processed within 7–14 business days to the original payment method.</li>
              <li>We reserve the right to cancel any order due to unavailability or force majeure.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">6. Service Area</h2>
            <p>
              Our services are currently available within Makkah Al-Mukarramah and Madinah Al-Munawwarah.
              Service availability may vary by location and time. We reserve the right to modify our service
              area at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">7. User Responsibilities</h2>
            <ul className="space-y-2 pl-4 border-l border-gold/20">
              <li>Provide accurate delivery address and contact information</li>
              <li>Be available to receive your order at the specified time</li>
              <li>Use the app for lawful purposes only</li>
              <li>Not attempt to defraud or abuse our services or drivers</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">8. Limitation of Liability</h2>
            <p>
              Masar Alhidayah shall not be liable for delays caused by traffic, weather, or other circumstances
              beyond our control. Our maximum liability for any claim shall not exceed the value of the order
              in question.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">9. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the
              Kingdom of Saudi Arabia. Any disputes shall be subject to the exclusive jurisdiction of
              the courts of Makkah Al-Mukarramah.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] font-light text-cream mb-4">10. Contact Us</h2>
            <p>
              For any questions regarding these Terms of Service, please contact us at:<br />
              <span className="text-gold">info@masaralhidayah.com</span><br />
              Masar Alhidayah Co. Ltd, Makkah Al-Mukarramah, Saudi Arabia
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
