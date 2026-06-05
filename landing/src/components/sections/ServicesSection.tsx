"use client";

import { useTranslations } from "next-intl";

const SERVICES = [
  {
    emoji: "🍽️",
    key: "food",
    accent: "teal",
    items: [
      { name: "Food & Beverages", price: "From SAR 15" },
      { name: "Hajj & Umroh Souvenirs", price: "From SAR 20" },
    ],
  },
  {
    emoji: "🕌",
    key: "tours",
    accent: "gold",
    items: [
      { name: "Makkah Ziyarah Tour", price: "SAR 150 / person" },
      { name: "Madinah Ziyarah Tour", price: "SAR 200 / person" },
      { name: "Custom Tour Package", price: "Request Quote" },
    ],
  },
  {
    emoji: "🛍️",
    key: "shopping",
    accent: "teal",
    items: [
      { name: "Go Shopping", price: "By product price" },
    ],
  },
  {
    emoji: "💆",
    key: "massage",
    accent: "gold",
    items: [
      { name: "Go Massage — 15 min", price: "SAR 45" },
      { name: "Go Massage — 30 min", price: "SAR 75" },
      { name: "Go Massage — 60 min", price: "SAR 150" },
    ],
  },
  {
    emoji: "📦",
    key: "cargo",
    accent: "teal",
    items: [
      { name: "Go Cargo — Within City", price: "From SAR 30" },
      { name: "Go Cargo — Domestic Saudi", price: "From SAR 60" },
      { name: "Go Cargo — International", price: "Request Quote" },
    ],
  },
  {
    emoji: "💅",
    key: "beauty",
    accent: "gold",
    items: [
      { name: "Hair Styling", price: "From SAR 50" },
      { name: "Makeup", price: "From SAR 80" },
      { name: "Nail Art", price: "From SAR 40" },
      { name: "Skincare", price: "From SAR 60" },
    ],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-[120px] bg-dark">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-[72px] reveal">
          <span className="eyebrow block mb-4">Our Services & Pricing</span>
          <div className="gold-line w-16 mx-auto mb-6" />
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-cream leading-[1.1] mb-5">
            Everything You Need,{" "}
            <em className="italic text-gold-light">Delivered to You</em>
          </h2>
          <p className="text-[15px] text-muted max-w-[480px] mx-auto">
            From food delivery to beauty services — our team comes to your location anywhere in Makkah &amp; Madinah.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.1)" }}>
          {SERVICES.map((service, i) => {
            const isTeal = service.accent === "teal";
            return (
              <div
                key={i}
                className={`reveal reveal-d${i % 4} group relative bg-dark p-8 overflow-hidden transition-colors duration-300 hover:bg-dark-2`}
              >
                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ${
                  isTeal
                    ? "bg-gradient-to-r from-teal to-teal-light"
                    : "bg-gradient-to-r from-gold-dim to-gold"
                }`} />

                {/* Emoji + title */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 border flex items-center justify-center text-xl ${
                    isTeal ? "border-teal/30 bg-teal/5" : "border-gold/25 bg-gold/5"
                  }`}>
                    {service.emoji}
                  </div>
                  <h3 className="font-display text-[20px] font-light text-cream tracking-wide capitalize">
                    Go {service.key.charAt(0).toUpperCase() + service.key.slice(1)}
                  </h3>
                </div>

                {/* Price list */}
                <ul className="space-y-3">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center justify-between gap-4 border-b border-gold/6 pb-3 last:border-none last:pb-0">
                      <span className="text-[13px] text-muted leading-[1.5]">{item.name}</span>
                      <span className={`text-[13px] font-medium whitespace-nowrap ${isTeal ? "text-teal" : "text-gold"}`}>
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* VAT note */}
        <p className="text-center text-[12px] text-muted/50 mt-6">
          * All prices are exclusive of 15% VAT · Prices may vary based on location and availability
        </p>
      </div>
    </section>
  );
}
