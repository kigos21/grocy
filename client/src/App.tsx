import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeAuthInterceptor } from "@/lib/interceptors";

// Layouts
import RequireAuth from "./components/RequireAuth";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />, // Guest routes
    children: [
      // { index: true, element: <LandingPage /> },
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
          // { index: true, element: <GroceryLists /> },
          // { path: "new", element: <GroceryListForm /> },
          // { path: ":id", element: <GroceryListDetail /> },
        ],
      },
      {
        path: "recipes",
        children: [
          // { index: true, element: <Recipes /> },
          // { path: "new", element: <RecipeForm /> },
          // { path: ":id", element: <RecipeDetail /> },
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
