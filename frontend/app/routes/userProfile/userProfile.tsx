import React, { useState, useEffect } from 'react';
import Logo from 'public/logo.svg';
import { logout, updateUserProfile } from '~/api/auth'; // Assuming you create this
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useAuthStore } from '~/store/authStore';

const UserProfile = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const navigate = useNavigate();
  const { fetchUser, user } = useAuthStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [loading, setLoading] = useState(false);

  const email = user?.email ?? '';

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

  const handleEdit = async () => {
    if (isEditing) {
      setLoading(true);

      try {
        await updateUserProfile({ firstName, lastName, phone });
        await fetchUser();
        toast.dismiss();
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } catch (error: any) {
        toast.dismiss();
        toast.error(error.message || 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="bg-gradient-to-tl from-indigo-700 to-purple-500 h-[100vh] flex flex-col justify-center items-center gap-5">
      <div className="bg-white w-[70%] flex flex-col items-center justify-center rounded-xl h-[70%] ">
        {isEditing ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex">
              <img src={Logo} alt="" height={200} width={200} />
            </div>
            <span className="flex flex-col space-y-1.5 pt-10">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-2xl outline-none border-b-2 border-black text-blue-600 font-bold text-center"
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-2xl outline-none border-b-2 border-black text-blue-600 font-bold text-center"
                placeholder="Last Name"
              />
              <input
                className="text-xl text-center outline-none border-b-2"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
              />
            </span>
            <p className="pt-3 pb-8 text-gray-600">{email}</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-center">
              <img src={Logo} alt="" height={200} width={200} />
            </div>
            <span className="flex flex-col items-center space-y-1.5 pt-10">
              <p className="text-3xl text-blue-600 font-bold">
                {firstName} {lastName}
              </p>
              <p className="text-xl">{phone}</p>
            </span>
            <p className="pt-3 pb-8 text-gray-600 text-center">{email}</p>
          </div>
        )}

        <button
          onClick={handleEdit}
          className="px-4 py-1 border border-blue-500 text-blue-500 rounded-xl cursor-pointer"
        >
          {isEditing ? 'Submit Changes' : 'Edit'}
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="hover:bg-blue-500 hover:text-white bg-white text-blue-500 px-7 py-4 border border-blue-500 rounded-xl cursor-pointer"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default UserProfile;
