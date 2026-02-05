import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "admin" | "superadmin" | "carer" | "client";
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const { isAuthenticated, role: userRole } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // allow admin + superadmin

  if (
    userRole &&
    role === "admin" &&
    !["admin", "superadmin"].includes(userRole)
  ) {
    return <Navigate to="/" replace />;
  }

  // only carer
  if (role === "carer" && userRole !== "carer") {
    return <Navigate to="/" replace />;
  }

  // only customer
  if (role === "client" && userRole !== "client") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
