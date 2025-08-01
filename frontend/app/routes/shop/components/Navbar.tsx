import React, { useEffect, useState } from 'react';
import Alimama from 'public/logo2.png';
import { ShoppingCart } from 'lucide-react';
import { useAuthStore } from '~/store/authStore';
import type { IProduct } from '~/types';
import { useNavigate } from 'react-router';
import { logout } from '~/api/auth';
import { toast } from 'react-toastify';
import { useCartStore } from '~/store/cartStore';

type NavbarProps = {
  cart?: IProduct[];
};
const Navbar: React.FC<NavbarProps> = ({ cart }) => {
  const { user, fetchUser } = useAuthStore();
  const { fetchCart, items } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const openCart = () => {
    navigate('/cart');
  };

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
    <div className="flex items-center justify-between h-[100px] py-10 bg-[#fefefe] z-50 sticky top-0">
      <div className="pt-5">
        <img src={Alimama} height={200} width={200} alt="" />
      </div>

      <div className="flex justify-around pr-20 w-2/3 items-center">
        <div className="relative w-1/2">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="search"
            className="border border-gray-400 outline-none h-[40px] rounded-xl pl-10 w-full"
            placeholder="Search products, brands and categories"
          />
        </div>

        {user ? (
          <p className="text-amber-500 ">Hello, {user.firstName} </p>
        ) : (
          <button className="hover:text-amber-500">
            {' '}
            <a href="/login">Login</a>{' '}
          </button>
        )}

        {user ? (
          user.role === 'admin' ? (
            <button className="hover:text-amber-500">
              <a href="/dashboard">Dashboard</a>
            </button>
          ) : (
            <p className="cursor-pointer hover:text-amber-500" onClick={handleLogout}>
              Logout
            </p>
          )
        ) : (
          <p className="cursor-pointer hover:text-amber-500">Help</p>
        )}

        <div className="cursor-pointer relative flex gap-3 hover:text-amber-500" onClick={openCart}>
          <span>
            <ShoppingCart />
            {items.length > 0 && (
              <span className="bg-red-500 rounded-full text-[8px] px-1 absolute text-white -top-1 left-5">
                {items.length}
              </span>
            )}
          </span>
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
