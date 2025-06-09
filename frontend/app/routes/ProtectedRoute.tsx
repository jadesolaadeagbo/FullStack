// import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import type{ ReactNode } from "react";
import Loader from "~/components/Loader";

export default function ProtectedRoute({ children }: { children: ReactNode}) {
  const { user, loading } = useAuthStore();

  if (loading) return <Loader/>;

  return user ? children : <Navigate to="/login" replace />;
}
 