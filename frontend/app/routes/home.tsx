import type { Route } from './+types/home';
import Login from './login/login';
import { useAuthStore } from '~/store/authStore';
import Loader from '~/components/Loader';
import UserProfile from './userProfile/userProfile';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Authentication' }, { name: 'description', content: 'Authentication project' }];
}

export default function Home() {
  const { user, loading } = useAuthStore();

  if (loading) return <Loader />;

  return user ? <UserProfile /> : <Login />;
}
