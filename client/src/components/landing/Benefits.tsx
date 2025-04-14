import React from "react";
import { Clock, DollarSign, Leaf } from "lucide-react";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const Benefit: React.FC<BenefitProps> = ({
  icon,
  title,
  description,
  delay,
}) => (
  <div
    className="animate-fade-in flex flex-col items-center text-center"
    style={{ animationDelay: delay }}
  >
    <div className="bg-brand-orange/10 mb-4 rounded-full p-4">{icon}</div>
    <h3 className="text-neutral-text mb-2 text-xl font-bold">{title}</h3>
    <p className="text-neutral-text/70">{description}</p>
  </div>
);

const BenefitsSection: React.FC = () => {
  return (
    <section
      id="benefits"
      className="from-brand-green-light/10 to-brand-orange-light/10 bg-gradient-to-r px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-neutral-text mb-4 text-3xl font-bold md:text-4xl">
            Benefits That Make a Difference
          </h2>
          <p className="text-neutral-text/70 mx-auto max-w-2xl text-lg">
            Our app doesn't just simplify meal planning—it transforms your
            entire cooking and shopping experience.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <Benefit
            icon={<Clock className="text-brand-orange h-8 w-8" />}
            title="Save Time"
            description="Spend less time planning meals and making grocery lists. Our app automates these tasks so you can focus on what matters."
            delay="0s"
          />

          <Benefit
            icon={<DollarSign className="text-brand-orange h-8 w-8" />}
            title="Save Money"
            description="Buy only what you need in the exact quantities required. Reduce impulse purchases and prevent food from going to waste."
            delay="0.1s"
          />

          <Benefit
            icon={<Leaf className="text-brand-orange h-8 w-8" />}
            title="Reduce Waste"
            description="With precise ingredient quantities, you'll reduce food waste and contribute to a more sustainable kitchen."
            delay="0.2s"
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
