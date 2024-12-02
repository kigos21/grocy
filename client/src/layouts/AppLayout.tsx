import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { AuthService } from "@/services/AuthService";
import useAuthStore from "@/store/authStore";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    const { message } = await AuthService.logout();
    logout();
    toast({
      description: message,
    });
  };

  return (
    <div className="grid h-screen grid-rows-[1fr_72px] md:grid-cols-[72px_1fr] md:grid-rows-1">
      <aside className="order-1 bg-secondary text-white md:order-none">
        Sidebar
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
