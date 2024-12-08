import { Link } from "react-router-dom";
import chefIllustration from "../assets/chef-illustration.png";
import recipeIllustration from "../assets/recipe-illustration.png";
import groceryIllustration from "../assets/grocery-illustration.png";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 px-6 py-8 md:px-16">
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="w-full text-center md:max-w-xl md:text-left">
          <h1 className="mb-4 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            Make grocery shopping much easier
          </h1>
          <p className="mb-6 text-lg text-gray-600 md:mb-8 md:text-xl">
            Grocery & Recipe maker
          </p>
          <Link
            to="/login"
            className="inline-block rounded-md bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            LOGIN NOW
          </Link>
        </div>

        <div className="flex w-full justify-center md:flex-1 md:justify-end">
          <img
            src={chefIllustration}
            alt="Chef illustration"
            className="w-[500px] object-contain transition-transform duration-300 hover:scale-105 md:w-[600px] lg:w-[800px]"
          />
        </div>
      </div>

      <hr className="my-8 w-full border-t border-black" />

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <img
          src={recipeIllustration}
          alt="Recipe illustration"
          className="w-[300px] object-contain transition-transform duration-300 hover:scale-105 md:w-[400px] lg:w-[600px]"
        />
        <div className="text-center md:text-left">
          <h2 className="mb-4 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            Create your favorite recipe
          </h2>
          <p className="mb-6 text-lg text-gray-600 md:mb-8 md:text-xl">
            • Discover new recipes and customize them to your taste.
            <br></br>• Easily create and save your favorite recipes.
          </p>
        </div>
      </div>

      <hr className="my-8 w-full border-t border-black" />

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="w-full text-center md:max-w-xl md:text-left">
          <h1 className="mb-4 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            Make your own grocery list
          </h1>
          <p className="mb-6 text-lg text-gray-600 md:mb-8 md:text-xl">
            • Organize your shopping with ease and efficiency.
            <br></br>• Create personalized grocery lists from your favorite
            recipes.
          </p>
        </div>

        <div className="flex w-full justify-center md:flex-1 md:justify-end">
          <img
            src={groceryIllustration}
            alt="Grocery illustration"
            className="w-[500px] object-contain transition-transform duration-300 hover:scale-105 md:w-[600px] lg:w-[800px]"
          />
        </div>
      </div>
    </div>
  );
}
