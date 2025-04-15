import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const GuestNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-sm md:px-12">
      <div className="flex items-center">
        <Link to={"/"} className="text-2xl font-bold text-brand-green-dark">
          Pantry<span className="text-brand-orange">Plan</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden items-center space-x-8 md:flex">
        <a
          href="#features"
          className="text-neutral-text transition-colors hover:text-brand-green"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-neutral-text transition-colors hover:text-brand-green"
        >
          How It Works
        </a>
        <a
          href="#benefits"
          className="text-neutral-text transition-colors hover:text-brand-green"
        >
          Benefits
        </a>
        <Link to={"/login"}>
          <Button className="bg-brand-orange text-white hover:bg-brand-orange-dark">
            Get Started
          </Button>
        </Link>
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
            className="text-neutral-text transition-colors hover:text-brand-green"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-neutral-text transition-colors hover:text-brand-green"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-neutral-text transition-colors hover:text-brand-green"
            onClick={() => setIsMenuOpen(false)}
          >
            Benefits
          </a>
          <Link to={"/login"}>
            <Button className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark">
              Get Starteds
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default GuestNavbar;
