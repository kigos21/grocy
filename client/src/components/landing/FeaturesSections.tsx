import { BookOpen, CalculatorIcon, ShoppingCart } from "lucide-react";
import React from "react";

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
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 p-3">
      {icon}
    </div>
    <h3 className="mb-3 text-xl font-bold text-neutral-text">{title}</h3>
    <p className="text-neutral-text/70">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="bg-neutral-bg px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-text md:text-4xl">
            Powerful Features for Effortless Meal Planning
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-text/70">
            Our app streamlines the entire process from recipe creation to
            grocery shopping, making meal planning a breeze.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <FeatureCard
            icon={<BookOpen className="h-8 w-8 text-brand-green" />}
            title="Create Recipes"
            description="Build your own custom recipes with ingredients, quantities, and instructions."
            delay="0s"
          />

          {/* <FeatureCard
            icon={<Upload className="text-brand-green h-8 w-8" />}
            title="Import Recipes"
            description="Import recipes from your favorite websites with a single click."
            delay="0.1s"
          /> */}

          <FeatureCard
            icon={<CalculatorIcon className="h-8 w-8 text-brand-green" />}
            title="Scale Ingredients"
            description="Automatically adjust ingredient quantities for any number of servings."
            delay="0.2s"
          />

          <FeatureCard
            icon={<ShoppingCart className="h-8 w-8 text-brand-green" />}
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
