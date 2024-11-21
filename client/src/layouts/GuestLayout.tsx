import { Link, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";

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
          Grocy ツ
        </Link>
        <div className="flex gap-1">
          <Button variant={"secondary"}>Login</Button>
          <Button>Register</Button>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t p-4">
        <div className="mx-auto max-w-screen-lg">
          <p className="mb-1 text-lg font-semibold tracking-wider">Grocy ツ</p>
          <p className="mb-6 text-sm text-muted">
            Your smart grocery companion. Shop smarter, eat better.
          </p>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Grocy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default GuestLayout;
