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
    <div>
      <aside>Sidebar</aside>

      <Button onClick={handleLogout}>Logout</Button>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
