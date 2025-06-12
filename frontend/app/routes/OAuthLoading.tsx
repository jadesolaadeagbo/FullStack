import { Loader2 } from 'lucide-react'; // optional, uses lucide-react icon
import { useEffect } from 'react';
import { useAuthStore } from '~/store/authStore';
import { useNavigate } from 'react-router';

export default function OAuthLoading() {
  const { fetchUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      await fetchUser();
      navigate('/userProfile', { replace: true });
    };

    checkAuth();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-700">
      <Loader2 className="animate-spin w-12 h-12 text-blue-600 mb-4" />
      <p className="text-lg font-medium">Logging you in with Google...</p>
      <p className="text-sm text-gray-500 mt-2">Please wait, redirecting you to your profile.</p>
    </div>
  );
}
