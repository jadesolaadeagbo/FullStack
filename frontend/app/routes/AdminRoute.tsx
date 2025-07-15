import { Navigate } from 'react-router';
import { useAuthStore } from '~/store/authStore';
import type { ReactNode } from 'react';
import Loader from '~/components/Loader';

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) return <Loader />;

  return user?.role === 'admin' ? children : <Navigate to="/login" replace />;
}
