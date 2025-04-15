import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";
import { AuthService } from "@/services/AuthService";
import useAuthStore from "@/store/authStore";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { ChefHat, House, Trash } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    const { message } = await AuthService.logout();
    logout();
    toast({
      description: message,
    });
  };

  return (
    <div className="grid min-h-screen md:grid-cols-[4.5rem_1fr] md:grid-rows-1">
      {/* An empty element to place at the side, so as not to mess the grid layout */}
      <div className="order-1 h-[4.5rem] md:order-none md:h-0" />

      {/* Nav */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-12 bg-foreground text-background max-md:h-[4.5rem] md:bottom-0 md:top-0 md:w-[4.5rem] md:flex-col md:justify-normal md:gap-8 md:py-6">
        <Link
          to={"/grocery-lists"}
          className="hidden text-3xl font-semibold tracking-wider text-secondary transition-colors hover:text-secondary/90 md:block"
        >
          Gr
        </Link>

        <Link
          to={"/grocery-lists"}
          className="text-xs transition-colors hover:text-background/70"
        >
          <div className="flex flex-col items-center">
            <House className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </div>
        </Link>

        <Link
          to={"/recipes"}
          className="text-xs transition-colors hover:text-background/70"
        >
          <div className="flex flex-col items-center">
            <ChefHat className="h-4 w-4" />
            <span className="hidden md:inline">Recipes</span>
          </div>
        </Link>

        <Link
          to={"/trash"}
          className="order-first text-xs transition-colors hover:text-background/70 md:order-none"
        >
          <div className="flex flex-col items-center text-center">
            <Trash className="h-4 w-4" />
            <span className="hidden md:inline">Trash</span>
          </div>
        </Link>

        <div className="text-xs md:mt-auto">
          <div className="flex flex-col items-center">
            <Dialog>
              <DialogTrigger>
                <Avatar className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-foreground">
                  <AvatarFallback>{getInitials(user!.name)}</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>You are logged in as {user?.email}.</DialogTitle>
                  <DialogDescription>
                    Log out of your account?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
