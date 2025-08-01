import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Outlet } from 'react-router';
import {
  LogOutIcon,
  LayoutDashboardIcon,
  StoreIcon,
  ShoppingBag,
  ShoppingBasketIcon,
  User2Icon,
} from 'lucide-react';
import { logout } from '~/api/auth';
import { useAuthStore } from '~/store/authStore';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import AdminRoute from '../AdminRoute';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUser, user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      await fetchUser();
      toast.dismiss();
      toast.success('User successfully logged out');
      navigate('/login', { replace: true });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminRoute>
      <div className="flex gap-10 h-[100vh] justify-between">
        <aside className="w-64 bg-gray-900 text-white p-4 fixed  h-[100vh]">
          <h2 className="text-2xl font-bold mb-6">ecommerce</h2>
          <div className="flex flex-col ">
            <nav className="space-y-2">
              <button
                onClick={() => navigate('/dashboard')}
                className={clsx(
                  'p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700',
                  isActive('/dashboard') && 'bg-gray-800'
                )}
              >
                <LayoutDashboardIcon />
                Dashboard
              </button>
              <button
                onClick={() => navigate('/dashboard/stores')}
                className={clsx(
                  'p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700',
                  isActive('/dashboard/stores') && 'bg-gray-800'
                )}
              >
                <StoreIcon />
                Stores
              </button>
              <button
                onClick={() => navigate('/dashboard/products')}
                className={clsx(
                  'p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700',
                  isActive('/dashboard/products') && 'bg-gray-800'
                )}
              >
                <ShoppingBag />
                Products
              </button>
              <button
                onClick={() => navigate('/create-admin')}
                className={clsx(
                  'p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700',
                  isActive('/create-admin') && 'bg-gray-800'
                )}
              >
                <User2Icon />
                Create Admin
              </button>
              <button
                onClick={() => navigate('/shop')}
                className={clsx(
                  'p-2 rounded flex gap-2 w-full cursor-pointer hover:bg-gray-700',
                  isActive('/shop') && 'bg-gray-800'
                )}
              >
                <ShoppingBasketIcon />
                Shop
              </button>
            </nav>

            <button
              onClick={handleLogout}
              className="p-2 rounded hover:bg-gray-700 flex gap-2 absolute bottom-10 cursor-pointer "
            >
              <LogOutIcon /> Logout
            </button>
          </div>
        </aside>
        <div className="pt-10 ml-76 w-full">
          <Outlet />
        </div>
      </div>
    </AdminRoute>
  );
};

export default Sidebar;
