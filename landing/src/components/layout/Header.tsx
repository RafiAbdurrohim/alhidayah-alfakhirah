"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  const navItems = [
    { key: "home", href: "#hero" },
    { key: "features", href: "#features" },
    { key: "about", href: "#how-it-works" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-400", scrolled ? "bg-dark/97 border-b border-gold/10 backdrop-blur-md" : "bg-gradient-to-b from-dark/95 to-transparent")}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
        {/* ── Logo ── */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 border border-gold flex items-center justify-center flex-shrink-0">
            <div className="absolute inset-[5px] border border-gold/25" />
            <span className="font-arabic text-gold text-lg leading-none">ه</span>
          </div>
          <span className="font-display text-[18px] font-light tracking-wide text-cream hidden sm:block">
            Alhidayah <span className="italic text-gold-light font-light">Alfakhirah</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className="relative text-[11px] tracking-[0.15em] uppercase text-cream/60 hover:text-gold-light transition-colors duration-200 group">
              {t(`nav.${item.key}`)}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button onClick={switchLocale} className="flex items-center gap-2 text-[12px] font-normal tracking-wide text-cream-dim hover:text-gold-light border border-gold/20 px-3 py-1.5 hover:border-gold/40 transition-all hidden sm:block">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c1.657 4.03 2.25 8.25 2.25 12.75M12 3c-1.657 4.03-2.25 8.25-2.25 12.75" />
            </svg>
            {locale === "en" ? "عربي" : "EN"}
          </button>

          {/* Login Button */}
          <Link
            href={`/${locale}/login`}
            className="hidden sm:inline-flex items-center text-[11px] tracking-[0.15em] uppercase text-gold-light border border-gold/30 px-5 py-2 hover:bg-gold/8 hover:border-gold/60 transition-all duration-300"
          >
            {t("login") || "Login"}
          </Link>

          {/* Download CTA */}
          <a href="#cta" className="inline-flex items-center text-[11px] tracking-[0.15em] uppercase bg-teal text-dark font-medium px-5 py-2 hover:bg-teal-light transition-colors duration-200 teal-glow-sm">
            {t("common.downloadApp")}
          </a>

          {/* Mobile Toggle */}
          <button className="md:hidden text-cream/70 hover:text-cream transition-colors p-1" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-2 border-t border-gold/10 px-6 py-6">
          <nav className="flex flex-col gap-5 mb-6">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className="text-[11px] tracking-[0.15em] uppercase text-cream/60 hover:text-gold-light transition-colors" onClick={() => setMobileOpen(false)}>
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Link href={`/${locale}/login`} className="text-center text-[11px] tracking-[0.15em] uppercase text-gold-light border border-gold/30 px-5 py-3 hover:bg-gold/8 transition-all" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
            <a href="#cta" className="text-center text-[11px] tracking-[0.15em] uppercase bg-teal text-dark font-medium px-5 py-3 hover:bg-teal-light transition-colors" onClick={() => setMobileOpen(false)}>
              {t("common.downloadApp")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
