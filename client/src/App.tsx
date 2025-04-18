import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { initializeAuthInterceptor } from "@/lib/interceptors";

// Layouts
import RequireAuth from "./components/RequireAuth";
import AppLayout from "./layouts/AppLayout";
import GuestLayout from "./layouts/GuestLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import RecipeCreate from "./pages/recipes/RecipeCreate";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import RecipeEdit from "./pages/recipes/RecipeEdit";
import Recipes from "./pages/recipes/Recipes";

import GroceryListCreate from "./pages/grocery-lists/GroceryListCreate";
import GroceryListDetail from "./pages/grocery-lists/GroceryListDetail";
import GroceryListEdit from "./pages/grocery-lists/GroceryListEdit";
import GroceryLists from "./pages/grocery-lists/GroceryLists";

import TrashPage from "./pages/TrashPage";

const router = createBrowserRouter([
  {
    // Guest routes
    path: "",
    element: <GuestLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    // Authenticated Routes
    path: "app",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to={"/app/grocery-lists"} replace /> },
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
