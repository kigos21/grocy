import FooterSection from "@/components/landing/FooterSection";
import GuestNavbar from "@/components/landing/GuestNavbar";
import ScrollToTop from "@/lib/ScrollToTop";
import useAuthStore from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

function GuestLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={"/app/grocery-lists"} />;
  }

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen min-w-[320px] flex-col">
        <GuestNavbar />

        <main className="min-h-screen flex-grow">
          <Outlet />
        </main>

        <FooterSection />
      </div>
    </>
  );
}

export default GuestLayout;
