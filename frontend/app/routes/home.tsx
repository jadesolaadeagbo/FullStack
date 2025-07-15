import type { Route } from './+types/home';
import Index from './shop';
import { useAuthStore } from '~/store/authStore';
import Loader from '~/components/Loader';
import UserProfile from './authentication/userProfile/userProfile';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'AliMama' }, { name: 'description', content: 'AliMama' }];
}

export default function Home() {
  const { user, loading } = useAuthStore();

  if (loading) return <Loader />;

  return <Index />;
}
