import {
  itemVariants,
  stepsContainerVariants,
  stepsItemVariants,
} from "@/lib/animationVariants";
import { BookOpen, CalculatorIcon, Check, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const StepCard: React.FC<{
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}> = ({ number, title, description, icon, delay }) => (
  <motion.div
    variants={stepsItemVariants}
    className="animate-fade-in flex flex-col items-start gap-6 md:flex-row"
    style={{ animationDelay: delay }}
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-xl font-bold text-white">
      {number}
    </div>
    <div className="flex-1">
      <div className="mb-2 flex items-center gap-3">
        <div className="rounded-full bg-brand-green/10 p-2">{icon}</div>
        <h3 className="text-xl font-bold text-neutral-text">{title}</h3>
      </div>
      <p className="text-neutral-text/70">{description}</p>
    </div>
  </motion.div>
);

const HowItWorksSection: React.FC = () => {
  return (
    <motion.section
      id="how-it-works"
      className="px-6 py-20 md:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={stepsContainerVariants}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-text md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-text/70">
            Our streamlined process makes meal planning and grocery shopping
            simpler than ever.
          </p>
        </motion.div>

        <div className="space-y-12">
          <StepCard
            number={1}
            icon={<BookOpen className="h-5 w-5 text-brand-green" />}
            title="Add Your Recipes"
            description="Create your own or use other users' recipes. Add ingredients, quantities, and relevant details."
            delay="0s"
          />

          <StepCard
            number={2}
            icon={<CalculatorIcon className="h-5 w-5 text-brand-green" />}
            title="Scale Recipes as Needed"
            description="Planning for a dinner party? Double the servings. Cooking for one? Halve the recipe. Our app automatically scales all ingredient quantities."
            delay="0.1s"
          />

          <StepCard
            number={3}
            icon={<ShoppingCart className="h-5 w-5 text-brand-green" />}
            title="Generate Your Grocery List"
            description="Select the recipes you want to make, and our app generates a comprehensive grocery list with all the ingredients you'll need."
            delay="0.2s"
          />

          <StepCard
            number={4}
            icon={<Check className="h-5 w-5 text-brand-green" />}
            title="Shop With Confidence"
            description="Head to the store with your organized grocery list. Check off items as you shop, knowing you're getting exactly what you need."
            delay="0.3s"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
