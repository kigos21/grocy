import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="from-brand-green-light/10 to-brand-orange-light/10 bg-gradient-to-r px-6 py-20 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center lg:flex-row">
        {/* Text Content */}
        <div className="animate-fade-in mb-10 lg:mb-0 lg:w-1/2 lg:pr-12">
          <h1 className="text-neutral-text mb-6 text-4xl font-bold md:text-5xl">
            Simplify Your{" "}
            <span className="text-brand-green">Meal Planning</span> and{" "}
            <span className="text-brand-orange">Grocery Shopping</span>
          </h1>
          <p className="text-neutral-text/80 mb-8 text-lg md:text-xl">
            Create recipes, scale ingredients automatically, and generate smart
            grocery lists that save you time and reduce food waste.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="bg-brand-green hover:bg-brand-green-dark px-8 py-6 text-lg text-white">
              Start Free
            </Button>
            <Button
              variant="outline"
              className="border-brand-orange text-brand-orange hover:bg-brand-orange/10 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div
          className="animate-fade-in lg:w-1/2"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative">
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Cooking ingredients and recipe planning"
                className="h-auto w-full rounded-lg"
              />
              <div className="absolute -bottom-6 -right-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-orange/20 rounded-full p-2">
                    <span className="text-brand-orange font-bold">3x</span>
                  </div>
                  <div>
                    <p className="text-neutral-text/70 text-sm">
                      Recipe scaled to
                    </p>
                    <p className="font-semibold">900g chicken</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
