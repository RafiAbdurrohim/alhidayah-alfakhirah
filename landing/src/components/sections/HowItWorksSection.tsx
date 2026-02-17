"use client";

import { useTranslations } from "next-intl";

const ROMAN = ["I", "II", "III", "IV"];

export function HowItWorksSection() {
  const t = useTranslations();

  const steps = [
    { key: "step1", accent: "gold" },
    { key: "step2", accent: "teal" },
    { key: "step3", accent: "gold" },
    { key: "step4", accent: "teal" },
  ];

  return (
    <section id="how-it-works" className="py-[120px] bg-dark overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-[80px] reveal">
          <span className="eyebrow block mb-4">{t("howItWorks.title") || "The Process"}</span>
          <div className="gold-line w-16 mx-auto mb-6" />
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-cream leading-[1.1]">
            How It <em className="italic text-gold-light">Works</em>
          </h2>
          <p className="text-[15px] text-muted mt-4 max-w-[400px] mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">

          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {steps.map((step, i) => {
            const isTeal = step.accent === "teal";
            return (
              <div
                key={i}
                className={`reveal reveal-d${i} text-center px-6 relative`}
              >
                {/* Number circle */}
                <div
                  className={`relative w-[72px] h-[72px] mx-auto mb-8 flex items-center justify-center border bg-dark ${
                    isTeal ? "border-teal/40" : "border-gold/30"
                  }`}
                >
                  {/* Inner border */}
                  <div
                    className={`absolute inset-[7px] border ${
                      isTeal ? "border-teal/15" : "border-gold/12"
                    }`}
                  />
                  <span
                    className={`font-display text-[26px] font-light z-10 ${
                      isTeal ? "text-teal" : "text-gold"
                    }`}
                  >
                    {ROMAN[i]}
                  </span>

                  {/* Glow dot on active (teal) steps */}
                  {isTeal && (
                    <div className="absolute inset-0 bg-teal/5 rounded-none" />
                  )}
                </div>

                <h3 className="font-display text-[22px] font-light text-cream mb-3">
                  {t(`howItWorks.${step.key}.title`)}
                </h3>
                <p className="text-[14px] text-muted leading-[1.7]">
                  {t(`howItWorks.${step.key}.description`)}
                </p>

                {/* Arrow connector (between steps, not last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-9 -right-4 w-8 items-center justify-center z-10">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
