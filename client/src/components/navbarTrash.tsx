import { NavLink } from "react-router-dom";

const NavbarTrash = () => {
  return (
    <div className="navbar-trash-container">
      <nav className="flex justify-center space-x-4 border-b border-gray-300 pb-2">
        <NavLink
          to="/recently-deleted/recipe"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`
          }
        >
          Recipe
        </NavLink>
        <NavLink
          to="/recently-deleted/grocery"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-600 text-blue-600"
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
