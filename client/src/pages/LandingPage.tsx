import { Link } from "react-router-dom";
import chefIllustration from "../assets/chef-illustration.png";
import recipeIllustration from "../assets/recipe-illustration.png";
import groceryIllustration from "../assets/grocery-illustration.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-8 gap-16">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Make grocery shopping much easier
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            Grocery & Recipe maker
          </p>
          <Link
            to="/login"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            LOGIN NOW
          </Link>
        </div>
        
        <div className="w-full md:flex-1 flex justify-center md:justify-end">
          <img 
            src={chefIllustration} 
            alt="Chef illustration" 
            className="w-[500px] md:w-[600px] lg:w-[800px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <hr className="w-full border-t border-black my-8" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <img 
          src={recipeIllustration} 
          alt="Recipe illustration" 
          className="w-[500px] md:w-[600px] lg:w-[800px] object-contain transition-transform duration-300 hover:scale-105"
        />
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Create your favorite recipe
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            • Discover new recipes and customize them to your taste.
            <br></br>
            • Easily create and save your favorite recipes.
          </p>
        </div>
      </div>

      <hr className="w-full border-t border-black my-8" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Make your own grocery list
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            • Organize your shopping with ease and efficiency.
            <br></br>
            • Create personalized grocery lists from your favorite recipes.
          </p>
        </div>
        
        <div className="w-full md:flex-1 flex justify-center md:justify-end">
          <img 
            src={groceryIllustration} 
            alt="Grocery illustration" 
            className="w-[500px] md:w-[600px] lg:w-[800px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
