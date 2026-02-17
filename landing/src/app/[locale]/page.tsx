"use client";

import { useReveal } from "@/lib/useReveal";
import { HeroSection }      from "@/components/sections/HeroSection";
import { FeaturesSection }  from "@/components/sections/FeaturesSection";
import { HowItWorksSection }from "@/components/sections/HowItWorksSection";
import { DriverSection }    from "@/components/sections/DriverSection";
import { CTASection }       from "@/components/sections/CTASection";
import { ContactSection }   from "@/components/sections/ContactSection";

export default function HomePage() {
  // Attach scroll-reveal observer to all .reveal elements
  useReveal();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DriverSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
