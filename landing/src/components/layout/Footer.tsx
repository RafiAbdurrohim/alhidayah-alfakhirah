"use client";

import { useTranslations } from "next-intl";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/lib/utils";

export function Footer() {
  const t = useTranslations();

  const socialIcons = {
    instagram: Instagram,
    facebook:  Facebook,
    whatsapp:  MessageCircle,
  };

  const quickLinks = [
    { label: t("footer.aboutUs"),        href: "#" },
    { label: t("footer.faq"),            href: "#" },
    { label: t("footer.privacyPolicy"),  href: "#" },
    { label: t("footer.termsOfService"), href: "#" },
  ];

  const navLinks = [
    { label: t("nav.home"),    href: "#hero" },
    { label: t("nav.features"),href: "#features" },
    { label: t("nav.contact"), href: "#contact" },
    { label: t("driver.title") || "Become a Driver", href: "#driver" },
  ];

  return (
    <footer className="bg-dark-2 border-t border-gold/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* ── Brand ── */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9 border border-gold flex items-center justify-center flex-shrink-0">
                <div className="absolute inset-[5px] border border-gold/25" />
                <span className="font-arabic text-gold text-lg leading-none">ه</span>
              </div>
              <span className="font-display text-[18px] font-light tracking-wide text-cream">
                Alhidayah{" "}
                <em className="italic text-gold-light not-italic font-light">Alfakhirah</em>
              </span>
            </div>

            <p className="text-[14px] text-muted leading-[1.75] mb-6 max-w-[300px]">
              {t("footer.description")}
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {Object.entries(SOCIAL_LINKS)
                .filter(([key]) => key in socialIcons)
                .slice(0, 3)
                .map(([key, url]) => {
                  const Icon = socialIcons[key as keyof typeof socialIcons];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border border-gold/15 flex items-center justify-center text-muted hover:border-teal/40 hover:text-teal transition-all duration-300"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
            </div>
          </div>

          {/* ── Navigate ── */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] text-muted hover:text-cream-dim transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal + Contact ── */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] text-muted hover:text-cream-dim transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-1">
              <p className="text-[13px] text-muted">{CONTACT_INFO.phone}</p>
              <p className="text-[13px] text-muted">{CONTACT_INFO.email}</p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-gold/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[13px] text-muted/60">{t("footer.copyright")}</p>
          <p className="text-[13px] text-muted/40">
            Made with <span className="text-gold-dim">✦</span> in Makkah
          </p>
        </div>
      </div>
    </footer>
  );
}
