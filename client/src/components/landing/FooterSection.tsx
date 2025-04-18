import React from "react";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-neutral-text px-6 py-12 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">
              <span className="text-brand-orange">Grocy</span>
            </h3>
            <p className="text-white/70">
              Simplifying meal planning and grocery shopping for home cooks
              everywhere.
            </p>
          </div>

          {/* Insert empty element at grid slot 2 */}
          <div></div>

          {/* <div>
            <h4 className="mb-4 font-semibold">Features</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Recipe Creation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Recipe Import
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Serving Calculator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Grocery Lists
                </a>
              </li>
            </ul>
          </div> */}

          {/* <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div> */}

          {/* <div> */}
          {/* <h4 className="mb-4 font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white/70 transition-colors hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-white/70 transition-colors hover:text-white"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-white/70 transition-colors hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div> */}
          {/* <div className="flex flex-col gap-2 text-start md:text-end">
              <a
                href="#"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Terms of Service
              </a>
            </div> */}
          {/* </div> */}
        </div>

        <div className="mt-8 flex flex-col justify-between border-t border-white/20 pt-8 md:flex-row">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} Grocy. All rights reserved.
          </p>
          {/* <div className="mt-4 flex space-x-6 md:mt-0">
            <a
              href="#"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
