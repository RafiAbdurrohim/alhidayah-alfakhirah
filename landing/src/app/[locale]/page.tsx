"use client";

import { useReveal } from "@/lib/useReveal";
import { HeroSection }       from "@/components/sections/HeroSection";
import { ServicesSection }   from "@/components/sections/ServicesSection";
import { FeaturesSection }   from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DriverSection }     from "@/components/sections/DriverSection";
import { CTASection }        from "@/components/sections/CTASection";
import { ContactSection }    from "@/components/sections/ContactSection";

export default function HomePage() {
  useReveal();

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DriverSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
