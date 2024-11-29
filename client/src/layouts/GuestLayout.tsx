import { Link, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

function GuestLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={"/grocery-lists"} />;
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between bg-secondary p-4">
        <Link
          to={"/"}
          className="text-2xl font-semibold tracking-wider text-white"
        >
          Grocy&nbsp;ツ
        </Link>
        <div className="flex gap-1">
          <Button variant={"secondary"}>
            <Link to={"/login"}>Login</Link>
          </Button>
          <Button>
            <Link to={"/register"}>Register</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default GuestLayout;
