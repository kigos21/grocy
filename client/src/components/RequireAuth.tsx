import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default RequireAuth;
