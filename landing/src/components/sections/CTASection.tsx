"use client";

import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations();

  return (
    <section id="cta" className="relative py-[120px] bg-dark-2 text-center overflow-hidden">

      {/* Concentric circle ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-teal/6 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-gold/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-teal/3 pointer-events-none" />

      {/* Teal glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="reveal">
          <span className="eyebrow block mb-4">{t("cta.availableOn") || "Get The App"}</span>
          <div className="gold-line w-16 mx-auto mb-6" />
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-cream leading-[1.1] mb-4">
            {t("cta.downloadTitle") || "Download Our App"}{" "}
            <em className="italic text-gold-light">Today</em>
          </h2>
          <p className="text-[15px] text-muted max-w-[400px] mx-auto">
            {t("cta.downloadSubtitle")}
          </p>
        </div>

        {/* Store Buttons */}
        <div className="reveal reveal-d1 flex flex-col sm:flex-row gap-4 justify-center mt-12">

          {/* App Store */}
          <a
            href="#"
            className="group inline-flex items-center gap-4 px-7 py-4 bg-dark-4 border border-gold/20 hover:border-gold/40 hover:bg-dark-5 transition-all duration-300"
          >
            <svg className="w-7 h-7 text-gold group-hover:text-gold-light transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className="text-[10px] tracking-[0.1em] uppercase text-muted">Download on the</div>
              <div className="font-display text-[17px] font-light text-cream tracking-wide">App Store</div>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="#"
            className="group inline-flex items-center gap-4 px-7 py-4 bg-teal text-dark border border-teal hover:bg-teal-light hover:border-teal-light transition-all duration-300 teal-glow"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.22.99.14l12.4-7.16-2.68-2.68-10.71 9.7zM.94 1.53C.36 1.86 0 2.47 0 3.24v17.52c0 .77.36 1.38.94 1.71l.1.06 9.82-9.82v-.23L1.04 1.47l-.1.06zM20.12 10.5l-2.55-1.47-3.01 3.01 3.01 3.01 2.57-1.48c.73-.42.73-1.65-.02-2.07zM3.18.24l12.4 7.16-2.68 2.68L2.19.38 3.18.24z"/>
            </svg>
            <div className="text-left">
              <div className="text-[10px] tracking-[0.1em] uppercase text-dark/60">Get it on</div>
              <div className="font-display text-[17px] font-light text-dark tracking-wide">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
