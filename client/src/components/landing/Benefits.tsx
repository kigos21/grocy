import {
  cardVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animationVariants";
import { Clock, DollarSign, Leaf } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

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
  <motion.div
    variants={cardVariants}
    className="animate-fade-in flex flex-col items-center text-center"
    style={{ animationDelay: delay }}
  >
    <div className="mb-4 rounded-full bg-brand-orange/10 p-4">{icon}</div>
    <h3 className="mb-2 text-xl font-bold text-neutral-text">{title}</h3>
    <p className="text-neutral-text/70">{description}</p>
  </motion.div>
);

const BenefitsSection: React.FC = () => {
  return (
    <motion.section
      id="benefits"
      className="bg-gradient-to-r from-brand-green-light/10 to-brand-orange-light/10 px-6 py-20 md:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-3xl font-bold text-neutral-text md:text-4xl"
          >
            Benefits That Make a Difference
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-neutral-text/70"
          >
            Our app doesn't just simplify meal planning—it transforms your
            entire cooking and shopping experience.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <Benefit
            icon={<Clock className="h-8 w-8 text-brand-orange" />}
            title="Save Time"
            description="Spend less time planning meals and making grocery lists. Our app automates these tasks so you can focus on what matters."
            delay="0s"
          />

          <Benefit
            icon={<DollarSign className="h-8 w-8 text-brand-orange" />}
            title="Save Money"
            description="Buy only what you need in the exact quantities required. Reduce impulse purchases and prevent food from going to waste."
            delay="0.1s"
          />

          <Benefit
            icon={<Leaf className="h-8 w-8 text-brand-orange" />}
            title="Reduce Waste"
            description="With precise ingredient quantities, you'll reduce food waste and contribute to a more sustainable kitchen."
            delay="0.2s"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default BenefitsSection;
