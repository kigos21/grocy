import FooterSection from "@/components/landing/FooterSection";
import GuestNavbar from "@/components/landing/GuestNavbar";
import useAuthStore from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

function GuestLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={"/grocery-lists"} />;
  }

  return (
    <div className="flex h-screen min-w-[320px] flex-col">
      <GuestNavbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <FooterSection />
    </div>
  );
}

export default GuestLayout;
