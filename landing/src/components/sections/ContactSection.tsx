"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT_INFO } from "@/lib/utils";

const CONTACT_ITEMS = [
  { icon: MapPin,  labelKey: "contact.address", valueKey: "address" },
  { icon: Phone,   labelKey: "contact.phone",   valueKey: "phone" },
  { icon: Mail,    labelKey: "contact.email",   valueKey: "email" },
  { icon: Clock,   labelKey: "contact.hours",   valueKey: null },
];

export function ContactSection() {
  const t = useTranslations();

  const contactValues: Record<string, string> = {
    address: CONTACT_INFO.address,
    phone:   CONTACT_INFO.phone,
    email:   CONTACT_INFO.email,
  };

  return (
    <section id="contact" className="py-[120px] bg-dark">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-[72px] reveal">
          <span className="eyebrow block mb-4">{t("contact.title") || "Get In Touch"}</span>
          <div className="gold-line w-16 mx-auto mb-6" />
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-cream leading-[1.1]">
            We'd Love to{" "}
            <em className="italic text-gold-light">Hear From You</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* ── Contact Info ── */}
          <div className="reveal space-y-0">
            {CONTACT_ITEMS.map(({ icon: Icon, labelKey, valueKey }, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 py-6 ${
                  i === 0 ? "border-t border-b" : "border-b"
                } border-gold/8`}
              >
                <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:border-teal/40 transition-colors">
                  <Icon size={15} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.1em] uppercase text-muted mb-1">
                    {t(labelKey)}
                  </div>
                  <div className="text-[15px] text-cream-dim">
                    {valueKey ? contactValues[valueKey] : t("contact.dailyHours")}
                  </div>
                </div>
              </div>
            ))}

            {/* Teal accent note */}
            <div className="mt-8 flex items-center gap-3 p-4 border border-teal/15 bg-teal/4">
              <div className="w-1 h-8 bg-teal flex-shrink-0" />
              <p className="text-[13px] text-muted leading-[1.6]">
                We respond to all inquiries within 24 hours during operating hours.
              </p>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="reveal reveal-d1">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={t("contact.name")}
                  className="w-full bg-dark-3/60 border border-gold/12 text-cream text-[14px] font-light placeholder:text-muted px-5 py-4 outline-none focus:border-teal/40 transition-colors duration-200"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t("contact.email")}
                  className="w-full bg-dark-3/60 border border-gold/12 text-cream text-[14px] font-light placeholder:text-muted px-5 py-4 outline-none focus:border-teal/40 transition-colors duration-200"
                />
              </div>
              <div>
                <textarea
                  placeholder={t("contact.message")}
                  rows={5}
                  className="w-full bg-dark-3/60 border border-gold/12 text-cream text-[14px] font-light placeholder:text-muted px-5 py-4 outline-none focus:border-teal/40 transition-colors duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-transparent border border-teal text-teal text-[11px] tracking-[0.2em] uppercase font-medium py-[18px] hover:bg-teal hover:text-dark transition-all duration-300"
              >
                {t("contact.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
