"use client";

import { useTranslations } from "next-intl";
import { Zap, ShoppingBag, Smartphone, Shield } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    num: "01",
    titleKey: "features.fastDelivery.title",
    descKey:  "features.fastDelivery.description",
    accent: "teal",   // teal icon
  },
  {
    icon: ShoppingBag,
    num: "02",
    titleKey: "features.wideSelection.title",
    descKey:  "features.wideSelection.description",
    accent: "gold",
  },
  {
    icon: Smartphone,
    num: "03",
    titleKey: "features.easyOrdering.title",
    descKey:  "features.easyOrdering.description",
    accent: "teal",
  },
  {
    icon: Shield,
    num: "04",
    titleKey: "features.securePayment.title",
    descKey:  "features.securePayment.description",
    accent: "gold",
  },
];

export function FeaturesSection() {
  const t = useTranslations();

  return (
    <section id="features" className="py-[120px] bg-dark-2">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-[72px] reveal">
          <span className="eyebrow block mb-4">{t("features.title") || "Why Choose Us"}</span>
          <div className="gold-line w-16 mx-auto mb-6" />
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-cream leading-[1.1] mb-5">
            We Deliver More Than{" "}
            <em className="italic text-gold-light">Just Food</em>
          </h2>
          <p className="text-[15px] text-muted max-w-[440px] mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Grid — 1px gap border trick */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.1)" }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const isTeal = f.accent === "teal";
            return (
              <div
                key={i}
                className={`reveal reveal-d${i} group relative bg-dark-2 p-10 overflow-hidden transition-colors duration-300 hover:bg-dark-3`}
              >
                {/* Bottom accent bar on hover */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ${
                    isTeal
                      ? "bg-gradient-to-r from-teal to-teal-light"
                      : "bg-gradient-to-r from-gold-dim to-gold"
                  }`}
                />

                {/* Icon box */}
                <div className="relative w-13 h-13 border border-gold/20 flex items-center justify-center mb-7">
                  {/* Corner num badge */}
                  <div
                    className={`absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[9px] font-medium text-dark ${
                      isTeal ? "bg-teal" : "bg-gold"
                    }`}
                  >
                    {f.num}
                  </div>
                  <Icon
                    size={20}
                    className={isTeal ? "text-teal" : "text-gold"}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-display text-[22px] font-light text-cream mb-3 tracking-wide">
                  {t(f.titleKey)}
                </h3>
                <p className="text-[14px] leading-[1.7] text-muted">
                  {t(f.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
