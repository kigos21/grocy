import React from "react";
import { BookOpen, Upload, ShoppingCart, CalculatorIcon } from "lucide-react";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}> = ({ icon, title, description, delay }) => (
  <div
    className="animate-fade-in rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
    style={{ animationDelay: delay }}
  >
    <div className="bg-brand-green/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full p-3">
      {icon}
    </div>
    <h3 className="text-neutral-text mb-3 text-xl font-bold">{title}</h3>
    <p className="text-neutral-text/70">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="bg-neutral-bg px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-neutral-text mb-4 text-3xl font-bold md:text-4xl">
            Powerful Features for Effortless Meal Planning
          </h2>
          <p className="text-neutral-text/70 mx-auto max-w-2xl text-lg">
            Our app streamlines the entire process from recipe creation to
            grocery shopping, making meal planning a breeze.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<BookOpen className="text-brand-green h-8 w-8" />}
            title="Create Recipes"
            description="Build your own custom recipes with ingredients, quantities, and instructions."
            delay="0s"
          />

          <FeatureCard
            icon={<Upload className="text-brand-green h-8 w-8" />}
            title="Import Recipes"
            description="Import recipes from your favorite websites with a single click."
            delay="0.1s"
          />

          <FeatureCard
            icon={<CalculatorIcon className="text-brand-green h-8 w-8" />}
            title="Scale Ingredients"
            description="Automatically adjust ingredient quantities for any number of servings."
            delay="0.2s"
          />

          <FeatureCard
            icon={<ShoppingCart className="text-brand-green h-8 w-8" />}
            title="Generate Lists"
            description="Turn your recipes into organized grocery lists with smart categorization."
            delay="0.3s"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
