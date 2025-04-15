import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-brand-green-light/10 to-brand-orange-light/10 px-6 py-20 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center lg:flex-row">
        {/* Text Content */}
        <div className="animate-fade-in mb-10 lg:mb-0 lg:w-1/2 lg:pr-12">
          <h1 className="mb-6 text-4xl font-bold text-neutral-text md:text-5xl">
            Simplify Your{" "}
            <span className="text-brand-green">Meal Planning</span> and{" "}
            <span className="text-brand-orange">Grocery Shopping</span>
          </h1>
          <p className="mb-8 text-lg text-neutral-text/80 md:text-xl">
            Create recipes, scale ingredients automatically, and generate smart
            grocery lists that save you time and reduce food waste.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to={"/login"} className="w-full">
              <Button className="w-full bg-brand-green px-8 py-6 text-lg text-white hover:bg-brand-green-dark">
                Start Free
              </Button>
            </Link>
            <a href="#features" className="w-full">
              <Button
                variant="outline"
                className="w-full border-brand-orange px-8 py-6 text-lg text-brand-orange hover:bg-brand-orange/10"
              >
                Learn More
              </Button>
            </a>
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
                  <div className="rounded-full bg-brand-orange/20 p-2">
                    <span className="font-bold text-brand-orange">3x</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-text/70">
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
