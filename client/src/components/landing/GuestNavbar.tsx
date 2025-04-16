import { Button } from "@/components/ui/button";
import { scrollToId as scroll, scrollToTop } from "@/lib/utils";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const GuestNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (anchorId: string) => {
    setIsMenuOpen(false);

    // Check if we are in "/"
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: anchorId } });
    } else {
      // Scroll to anchor id
      scroll(anchorId);
    }
  };

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the menu is open and the click is outside both the menu and the toggle button
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Listen for location changes to handle scrolling after navigation
  useEffect(() => {
    if (location.state && location.state.scrollToId) {
      const { scrollToId } = location.state as { scrollToId: string };

      // Clear the state to prevent scrolling on subsequent navigations
      window.history.replaceState({}, document.title);

      // Scroll to the section
      scroll(scrollToId);
    }
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-4 shadow-sm md:px-12">
      <div className="flex items-center">
        <Link
          to={"/"}
          className="text-2xl font-bold text-brand-green-dark"
          onClick={() => {
            setIsMenuOpen(false);
            scrollToTop();
          }}
        >
          Grocy
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden items-center space-x-8 md:flex">
        <button
          onClick={() => handleAnchorClick("features")}
          className="text-neutral-text transition-colors hover:text-brand-green"
        >
          Features
        </button>
        <button
          onClick={() => handleAnchorClick("how-it-works")}
          className="text-neutral-text transition-colors hover:text-brand-green"
        >
          How It Works
        </button>
        <button
          onClick={() => handleAnchorClick("benefits")}
          className="text-neutral-text transition-colors hover:text-brand-green"
        >
          Benefits
        </button>
        <Link to={"/login"}>
          <Button className="bg-brand-orange text-white hover:bg-brand-orange-dark">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden">
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            ref={menuRef}
            className="absolute left-0 right-0 top-16 flex flex-col space-y-4 bg-white p-4 shadow-md md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <button
                onClick={() => handleAnchorClick("features")}
                className="w-full text-left text-neutral-text transition-colors hover:text-brand-green"
              >
                Features
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <button
                className="w-full text-left text-neutral-text transition-colors hover:text-brand-green"
                onClick={() => handleAnchorClick("how-it-works")}
              >
                How It Works
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                className="w-full text-left text-neutral-text transition-colors hover:text-brand-green"
                onClick={() => handleAnchorClick("benefits")}
              >
                Benefits
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-brand-orange text-white hover:bg-brand-orange-dark">
                  Get Started
                </Button>
              </Link>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default GuestNavbar;
