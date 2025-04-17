import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";
import { motion, Variants } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const floatingCardVariants: Variants = {
    hidden: { opacity: 0, x: 20, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 },
    },
  };

  return (
    <motion.section
      className="bg-gradient-to-r from-brand-green-light/10 to-brand-orange-light/10 px-6 py-20 md:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center lg:flex-row">
        {/* Text Content */}
        <motion.div className="mb-10 lg:mb-0 lg:w-1/2 lg:pr-12">
          <motion.h1
            className="mb-6 text-4xl font-bold text-neutral-text md:text-5xl"
            variants={itemVariants}
          >
            Simplify Your{" "}
            <span className="text-brand-green">Meal Planning</span> and{" "}
            <span className="text-brand-orange">Grocery Shopping</span>
          </motion.h1>
          <motion.p
            className="mb-8 text-lg text-neutral-text/80 md:text-xl"
            variants={itemVariants}
          >
            Create recipes, scale ingredients automatically, and generate smart
            grocery lists that save you time and reduce food waste.
          </motion.p>
          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Link to={"/login"} className="w-full" viewTransition>
              <Button className="w-full bg-brand-green px-8 py-6 text-lg text-white hover:bg-brand-green-dark">
                Start Free
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-brand-orange px-8 py-6 text-lg text-brand-orange hover:bg-brand-orange/10"
              onClick={() => scrollToId("features")}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div className="lg:w-1/2">
          <div className="relative">
            <motion.div
              className="rounded-2xl bg-white p-6 shadow-xl"
              variants={imageVariants}
            >
              <img
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Cooking ingredients and recipe planning"
                className="h-auto w-full rounded-lg"
              />
              <motion.div
                className="absolute -bottom-6 -right-6 rounded-lg bg-white p-4 shadow-lg"
                variants={floatingCardVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/20">
                    <span className="font-bold text-brand-orange">3x</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-text/70">
                      Recipe scaled to
                    </p>
                    <p className="font-semibold">900g chicken</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
