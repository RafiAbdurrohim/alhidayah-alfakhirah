"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Staggered reveal on mount
    const els = sectionRef.current?.querySelectorAll(".hero-reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 100 + i * 120);
    });
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(14,165,164,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_20%_30%,rgba(201,168,76,0.06)_0%,transparent_50%)]" />
      </div>

      {/* Corner ornament */}
      <div className="absolute top-[-60px] right-[-60px] w-[380px] h-[380px] rounded-full border border-gold/8 pointer-events-none" />
      <div className="absolute top-[-20px] right-[-20px] w-[280px] h-[280px] rounded-full border border-teal/5 pointer-events-none" />

      {/* ── Left: Content ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-20 pt-28 pb-16">
        {/* Eyebrow */}
        <div className="hero-reveal reveal flex items-center gap-4 mb-8">
          <div className="gold-line-left w-12" />
          <span className="eyebrow">Makkah Al-Mukarramah · Est. 2026</span>
        </div>

        {/* Title */}
        <h1 className="hero-reveal reveal font-display text-[clamp(52px,5.5vw,80px)] font-light leading-[1.05] tracking-[-0.01em] text-cream mb-4">
          {t("hero.title")}
          <br />
          <em className="italic text-gold-light">{t("hero.subtitle")}</em>
        </h1>

        {/* Arabic subtitle */}
        <p className="hero-reveal reveal font-arabic text-[clamp(24px,2.5vw,38px)] text-gold-dim/70 mb-8 text-right lg:text-left" dir="rtl">
          الهداية الفاخرة
        </p>

        {/* Description */}
        <p className="hero-reveal reveal text-[15px] leading-[1.75] text-cream-dim max-w-[420px] mb-10 font-light">{t("hero.description")}</p>

        {/* CTA Buttons */}
        <div className="hero-reveal reveal flex flex-col sm:flex-row gap-4 mb-14">
          {/* Primary — Teal */}
          <a href="#cta" className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase bg-teal text-dark font-medium px-7 py-[14px] hover:bg-teal-light transition-colors duration-200 teal-glow">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            {t("hero.orderNow")}
          </a>

          {/* Secondary — Gold outline */}
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase border border-gold/30 text-cream/80 px-7 py-[14px] hover:border-gold/60 hover:text-gold-light transition-all duration-300"
          >
            {t("hero.viewMenu")}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="hero-reveal reveal flex gap-10 pt-8 border-t border-gold/12">
          {[
            { num: "1K+", label: "Happy Customers" },
            { num: "50+", label: "Menu Items" },
            { num: "30m", label: "Fast Delivery" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-[34px] font-light text-gold-light leading-none">{s.num}</div>
              <div className="text-[11px] tracking-[0.1em] uppercase text-muted mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Image ── */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0" style={{ clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80" alt="Authentic Arabic cuisine" className="w-full h-full object-cover brightness-[0.65] saturate-90" />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
          {/* Teal tint accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_30%,rgba(14,165,164,0.08)_0%,transparent_60%)]" />
        </div>

        {/* Floating Rating Card */}
        <div className="absolute bottom-16 left-[-20px] z-10 bg-dark-3/95 border border-gold/20 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-gold text-sm tracking-wider">★★★★★</span>
            <span className="font-display text-[22px] font-light text-gold-light">4.9</span>
          </div>
          <p className="text-[11px] tracking-[0.05em] text-muted">Customer Rating · 1,200+ Reviews</p>
        </div>

        {/* Teal accent bar */}
        <div className="absolute top-0 left-[8%] bottom-0 w-[2px] bg-gradient-to-b from-transparent via-teal/30 to-transparent" />
      </div>
    </section>
  );
}
