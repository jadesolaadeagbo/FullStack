import React,{useEffect} from 'react'
import Logo from "public/logo.svg"
import { logout } from '~/api/auth';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router';
import { useAuthStore } from '~/store/authStore';

const UserProfile = () => {

  useEffect(() => {
      document.title = 'Dashboard';
    }, []);

  const navigate = useNavigate();
  const { fetchUser, user } = useAuthStore();


  const firstName = user?.firstName ?? ""
  const lastName = user?.lastName ?? ""
  const phone = user?.phone ?? ""
  const email = user?.email ?? ""


  const handleLogout = async() => {
    try {
      await logout();
      await fetchUser();
      toast.success("User successfully logged out");

      navigate("/login", {replace: true})
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  }
    
  return (
        <div className='bg-gradient-to-tl from-indigo-700 to-purple-500 h-[100vh] flex flex-col justify-center items-center gap-5'>
          <div className='bg-white w-[70%] flex flex-col items-center justify-center rounded-xl h-[70%] '>
            <div className='flex justify-center'>
              <img src={Logo} alt="" height={200} width={200}/>
            </div>
            <span className='flex flex-col items-center space-y-1.5 pt-10'>
              <p className='text-3xl text-blue-600 font-bold'>{firstName} {lastName}</p>
              <p className='text-xl'>{phone}</p>
            </span>

            <p className='pt-3 pb-8 text-gray-600'>{email}</p>


          <button className='px-4 py-1 border border-blue-500 text-blue-500 rounded-xl cursor-pointer'>Edit</button>

          </div>

          <button onClick={handleLogout} className='hover:bg-blue-500 hover:text-white bg-white text-blue-500 px-7 py-4 border border-blue-500 rounded-xl cursor-pointer'>LOGOUT</button>


        </div>
  )
}

export default UserProfile