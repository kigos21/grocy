import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const GuestNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-sm md:px-12">
      <div className="flex items-center">
        <span className="text-brand-green-dark text-2xl font-bold">
          Pantry<span className="text-brand-orange">Plan</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden items-center space-x-8 md:flex">
        <a
          href="#features"
          className="text-neutral-text hover:text-brand-green transition-colors"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-neutral-text hover:text-brand-green transition-colors"
        >
          How It Works
        </a>
        <a
          href="#benefits"
          className="text-neutral-text hover:text-brand-green transition-colors"
        >
          Benefits
        </a>
        <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">
          Get Started
        </Button>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-16 flex flex-col space-y-4 bg-white p-4 shadow-md md:hidden">
          <a
            href="#features"
            className="text-neutral-text hover:text-brand-green transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-neutral-text hover:text-brand-green transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-neutral-text hover:text-brand-green transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Benefits
          </a>
          <Button className="bg-brand-orange hover:bg-brand-orange-dark w-full text-white">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default GuestNavbar;
