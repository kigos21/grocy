import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";

function GuestLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={"/grocery-lists"} />;
  }

  return (
    <div>
      <header>Guest Header</header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default GuestLayout;
