import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

