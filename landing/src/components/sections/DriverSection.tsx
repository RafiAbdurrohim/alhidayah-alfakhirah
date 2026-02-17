"use client";

import { useTranslations } from "next-intl";

export function DriverSection() {
  const t = useTranslations();

  const benefits = [
    t("driver.benefits.flexible"),
    t("driver.benefits.competitive"),
    t("driver.benefits.bonuses"),
  ];

  return (
    <section id="driver" className="relative bg-dark-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* ── Left: Image ── */}
        <div className="relative overflow-hidden min-h-[300px] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80"
            alt="Become a delivery partner"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.55] saturate-75"
          />
          {/* Overlay fading to the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dark-3/40 to-dark-3 hidden lg:block" />
          {/* Overlay fading up (mobile) */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-3 via-transparent to-transparent lg:hidden" />

          {/* Teal accent line */}
          <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-teal/40 to-transparent hidden lg:block" />
        </div>

        {/* ── Right: Content ── */}
        <div className="reveal relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20">

          <span className="eyebrow block mb-4">{t("driver.subtitle") || "Join Our Team"}</span>
          <div className="gold-line-left mb-6" />

          <h2 className="font-display text-[clamp(36px,4vw,54px)] font-light text-cream leading-[1.1] mb-8">
            {t("driver.title") || "Become a"}{" "}
            <br />
            <em className="italic text-gold-light">Delivery Partner</em>
          </h2>

          {/* Earning badge */}
          <div className="inline-flex items-baseline gap-3 border border-gold/20 px-6 py-4 mb-8 self-start">
            <span className="font-display text-[34px] font-light text-teal-light leading-none">
              2,500–3,500
            </span>
            <div>
              <div className="text-[12px] font-medium text-gold tracking-wider">SAR</div>
              <div className="text-[12px] text-muted">Monthly Earnings</div>
            </div>
          </div>

          {/* Benefits */}
          <ul className="space-y-4 mb-10">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className={`w-[6px] h-[6px] mt-[9px] flex-shrink-0 ${i % 2 === 0 ? "bg-teal" : "bg-gold"}`} />
                <span className="text-[15px] text-cream-dim">{b}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#"
            className="self-start inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase bg-teal text-dark font-medium px-8 py-[14px] hover:bg-teal-light transition-colors duration-200 teal-glow"
          >
            {t("driver.applyNow")}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
