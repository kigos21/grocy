import React from "react";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="bg-brand-green-dark px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Ready to Transform Your Meal Planning?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg opacity-90 md:text-xl">
          Join thousands of home cooks who have simplified their meal planning
          and grocery shopping process with our app.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="text-brand-green-dark bg-white px-8 text-lg hover:bg-gray-100"
          >
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-brand-green-dark border-white px-8 text-lg text-white hover:bg-white/10 hover:text-white"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
