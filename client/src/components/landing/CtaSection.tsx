import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

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
          <Link to={"/login"} className="w-full">
            <Button
              size="lg"
              className="w-full bg-white px-8 text-lg text-brand-green-dark hover:bg-gray-100"
            >
              Get Started Free
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-white bg-brand-green-dark px-8 text-lg text-white hover:bg-white/10 hover:text-white"
            onClick={() => scrollToId("features")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
