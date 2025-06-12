import { Navigate } from 'react-router';
import { useAuthStore } from '~/store/authStore';
import type { ReactNode } from 'react';
import Loader from '~/components/Loader';

export default function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) return <Loader />;

  return user ? <Navigate to="/userProfile" replace /> : children;
}
