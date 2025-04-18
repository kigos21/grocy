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
import { ChefHat, House, Menu, Trash } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { message } = await AuthService.logout();
    logout();
    toast({
      description: message,
    });
  };

  return (
    <div className="grid min-h-screen grid-rows-[3.5rem_1fr] md:grid-cols-[3.5rem_1fr] md:grid-rows-1">
      {/* Grid placeholder */}
      <div className="max-md:hidden md:w-[3.5rem]"></div>

      {/* Nav */}
      <aside className="sticky top-0 z-20 flex items-center justify-between bg-foreground text-background max-md:h-[3.5rem] max-md:px-4 md:fixed md:bottom-0 md:w-[3.5rem] md:flex-col md:justify-normal md:gap-8 md:py-6">
        <Link
          to={"/app/grocery-lists"}
          className="text-3xl font-semibold tracking-wider text-secondary transition-colors hover:text-secondary/90 md:block"
        >
          Gr
        </Link>

        <button
          className="rounded p-1 transition-colors hover:bg-background hover:text-foreground md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link
          to={"/app/grocery-lists"}
          className="hidden text-xs transition-colors hover:text-background/70 md:block"
        >
          <div className="flex flex-col items-center">
            <House className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </div>
        </Link>

        <Link
          to={"/app/recipes"}
          className="hidden text-xs transition-colors hover:text-background/70 md:block"
        >
          <div className="flex flex-col items-center">
            <ChefHat className="h-4 w-4" />
            <span className="hidden md:inline">Recipes</span>
          </div>
        </Link>

        <Link
          to={"/app/trash"}
          className="order-first hidden text-xs transition-colors hover:text-background/70 md:order-none md:block"
        >
          <div className="flex flex-col items-center text-center">
            <Trash className="h-4 w-4" />
            <span className="hidden md:inline">Trash</span>
          </div>
        </Link>

        <div className="hidden text-xs md:mt-auto md:block">
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

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            className="fixed left-0 right-0 top-[3.5rem] z-10 bg-foreground px-2 pb-4 pt-1 text-lg text-background shadow-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.li
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to={"/"}
                className="flex-1 rounded px-2 transition-all hover:bg-background/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </motion.li>
            <motion.li
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Link
                to={"/recipes"}
                className="flex-1 rounded px-2 transition-all hover:bg-background/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Recipes
              </Link>
            </motion.li>
            <motion.li
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to={"/trash"}
                className="flex-1 rounded px-2 transition-all hover:bg-background/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Trash
              </Link>
            </motion.li>
            <motion.li
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Link
                to={"/logout"}
                className="flex-1 rounded px-2 transition-all hover:bg-background/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </Link>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
