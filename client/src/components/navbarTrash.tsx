import { NavLink } from "react-router-dom";

const NavbarTrash = () => {
  return (
    <div className="pb-2 pt-6">
      <nav className="flex justify-center space-x-12 pb-2">
        <NavLink
          to="/recently-deleted/recipe"
          className={({ isActive }) =>
            ` ${
              isActive
                ? "border-b-2 border-black font-semibold text-black"
                : "text-gray-500"
            }`
          }
        >
          Recipe
        </NavLink>
        <NavLink
          to="/recently-deleted/grocery"
          className={({ isActive }) =>
            ` ${
              isActive
                ? "border-b-2 border-black font-semibold text-black"
                : "text-gray-500"
            }`
          }
        >
          Grocery
        </NavLink>
      </nav>
    </div>
  );
};

export default NavbarTrash;
