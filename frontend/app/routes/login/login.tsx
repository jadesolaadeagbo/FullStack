import React, { useEffect, useState } from 'react';
import Logo from "public/logo.svg";
import LoginImage from "public/login.png";
import gmail from "public/google.svg";
import { googleLogin, login } from '~/api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useAuthStore } from '~/store/authStore';
import eye from "public/eye.svg";
import eyeOff from "public/eye-off.svg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    try {
      const response = await login({ email: email.trim(), password });
    
      if (!response) {
        throw new Error(response?.message || "Login failed. Please try again.");
      }
    
      await fetchUser();
    
      toast.success("Login successful!");
      navigate("/userProfile");

      setEmail('');
      setPassword('');

    } catch (error: any) {
      console.error("Login error:", error);
      toast.error( error.message || "Something went wrong during login.");
    } finally{
        setLoading(false);

    }
    
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
    setLoading(true);

      await googleLogin();
      await useAuthStore.getState().fetchUser(); 
      // toast.success("Logged in with Google!");
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error("Something went wrong with Google login.");
    }  finally{
        setLoading(false);

    }
  };

  return (
    <div className='px-32 py-10 h-screen'>
      <div>
        <img src={Logo} alt="logo" height="30px" width="30px" />
        <div className='flex items-start justify-between'>
          <div className='pt-30'>
            <h1 className='text-5xl font-bold pb-3.5'>Login</h1>
            <p className='font-light text-gray-500'>Login to access your account</p>

            <form className='w-[550px]' onSubmit={handleSubmit}>

              <div className='flex flex-col pt-5'>
                <input
                  type="email"
                  className='border border-gray-500 rounded-sm h-10 px-2'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='relative flex flex-col pt-5'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='border border-gray-500 rounded-sm h-10 px-2'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className='absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600'
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  <img src={showPassword ? eye : eyeOff} width={20} />
                </span>
              </div>

              {/* Options */}
              <div className='flex justify-between items-center pt-6'>
                <div className='flex gap-2'>
                  <input type="checkbox" className='cursor-pointer' />
                  <p className='text-sm'>Remember me</p>
                </div>

                <a href='/forgotPassword' className='text-sm text-red-400'>Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-10 w-full py-3 rounded-sm text-white 
                  ${loading ? "bg-blue-400" : "bg-blue-600"}
                  ${loading ? "cursor-not-allowed" : "cursor-pointer "}
                  transition-colors duration-200 ease-in-out`}
              >
                {loading ? 'Logging in...' : 'Login'}
                </button>


              <div className='text-center flex pt-5 justify-center'>
                <span>Don't have an account? &nbsp;</span>
                <a href='/signup' className='text-red-400'>Sign up</a>
              </div>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-4 text-gray-500">or</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>


            </form>

            <button
                onClick={handleGoogleLogin}
                type="button"
                className='border cursor-pointer border-gray-400 py-2 w-full rounded-sm flex justify-center items-center gap-2'
              >
                <img src={gmail} alt="Google" height={20} width={20} />
                Sign in with Google
              </button>
          </div>

          <img
            src={LoginImage}
            alt="login page"
            className='pb-20'
            style={{ height: 'calc(100vh - 80px)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
