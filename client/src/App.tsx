import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { initializeAuthInterceptor } from "@/lib/interceptors";

// Layouts
import RequireAuth from "./components/RequireAuth";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Recipes from "./pages/recipes/Recipes";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import RecipeCreate from "./pages/recipes/RecipeCreate";
import RecipeEdit from "./pages/recipes/RecipeEdit";

import GroceryLists from "./pages/grocery-lists/GroceryLists";
import GroceryListCreate from "./pages/grocery-lists/GroceryListCreate";
import GroceryListDetail from "./pages/grocery-lists/GroceryListDetail";
import GroceryListEdit from "./pages/grocery-lists/GroceryListEdit";

import TrashPage from "./pages/TrashPage";

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
          { path: "new", element: <GroceryListCreate /> },
          { path: ":id/edit", element: <GroceryListEdit /> },
          { path: ":id", element: <GroceryListDetail /> },
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
        path: "trash",
        element: <TrashPage />,
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
