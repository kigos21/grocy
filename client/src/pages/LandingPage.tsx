import BenefitsSection from "@/components/landing/Benefits";
import CtaSection from "@/components/landing/CtaSection";
import FeaturesSection from "@/components/landing/FeaturesSections";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CtaSection />
    </>
  );
}
