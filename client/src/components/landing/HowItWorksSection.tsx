import React from "react";
import { BookOpen, ShoppingCart, Check, CalculatorIcon } from "lucide-react";

const StepCard: React.FC<{
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}> = ({ number, title, description, icon, delay }) => (
  <div
    className="animate-fade-in flex flex-col items-start gap-6 md:flex-row"
    style={{ animationDelay: delay }}
  >
    <div className="bg-brand-green flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white">
      {number}
    </div>
    <div className="flex-1">
      <div className="mb-2 flex items-center gap-3">
        <div className="bg-brand-green/10 rounded-full p-2">{icon}</div>
        <h3 className="text-neutral-text text-xl font-bold">{title}</h3>
      </div>
      <p className="text-neutral-text/70">{description}</p>
    </div>
  </div>
);

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-neutral-text mb-4 text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <p className="text-neutral-text/70 mx-auto max-w-2xl text-lg">
            Our streamlined process makes meal planning and grocery shopping
            simpler than ever.
          </p>
        </div>

        <div className="space-y-12">
          <StepCard
            number={1}
            icon={<BookOpen className="text-brand-green h-5 w-5" />}
            title="Add Your Recipes"
            description="Create your own recipes or import them from your favorite websites. Add ingredients, quantities, and cooking instructions."
            delay="0s"
          />

          <StepCard
            number={2}
            icon={<CalculatorIcon className="text-brand-green h-5 w-5" />}
            title="Scale Recipes as Needed"
            description="Planning for a dinner party? Double the servings. Cooking for one? Halve the recipe. Our app automatically scales all ingredient quantities."
            delay="0.1s"
          />

          <StepCard
            number={3}
            icon={<ShoppingCart className="text-brand-green h-5 w-5" />}
            title="Generate Your Grocery List"
            description="Select the recipes you want to make, and our app generates a comprehensive grocery list with all the ingredients you'll need."
            delay="0.2s"
          />

          <StepCard
            number={4}
            icon={<Check className="text-brand-green h-5 w-5" />}
            title="Shop With Confidence"
            description="Head to the store with your organized grocery list. Check off items as you shop, knowing you're getting exactly what you need."
            delay="0.3s"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
