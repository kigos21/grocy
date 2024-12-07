import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import { initializeAuthInterceptor } from "@/lib/interceptors";

// Layouts
import RequireAuth from "./components/RequireAuth";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import GroceryLists from "./pages/grocery-lists/GroceryLists";
import Recipes from "./pages/recipes/Recipes";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import RecipeCreate from "./pages/recipes/RecipeCreate";
import RecipeEdit from "./pages/recipes/RecipeEdit";

import FullDisplayList from "./pages/grocery-lists/FullDisplayList";
import DeletedRecipe from "./pages/RecentlyDeleted/DeletedRecipe";
import * as DeletedGrocery from "./pages/RecentlyDeleted/DeletedGrocery";
import NavbarTrash from "./components/navbarTrash";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />, // Guest routes
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ), // Authenticated routes
    children: [
      {
        path: "grocery-lists",
        children: [
          { index: true, element: <GroceryLists /> },
          // { path: "new", element: <GroceryListForm /> },
          // { path: ":id", element: <GroceryListDetail /> },
        ],
      },
      {
        path: "recipes",
        children: [
          { index: true, element: <Recipes /> },
          { path: "new", element: <RecipeCreate /> },
          { path: ":id/edit", element: <RecipeEdit /> },
          { path: ":id", element: <RecipeDetail /> },
        ],
      },

      {
        path: "test",
        children: [{ index: true, element: <FullDisplayList /> }],
      },

      {
        path: "recently-deleted",
        element: (
          <div>
            <NavbarTrash />
            <Outlet />
          </div>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="recipe" replace />,
          },
          {
            path: "recipe",
            children: [{ index: true, element: <DeletedRecipe /> }],
          },
          {
            path: "grocery",
            children: [{ index: true, element: <DeletedGrocery /> }],
          },
        ],
      },
    ],
  },
]);

// Initialize auth interceptor when user is logged in on boot
initializeAuthInterceptor();

function App() {
  return <RouterProvider router={router} />;
}

export default App;
