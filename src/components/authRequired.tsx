import { useAuth } from "./authProvider";
import { useLocation, Navigate } from "react-router-dom";

export default function AuthRequired({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
