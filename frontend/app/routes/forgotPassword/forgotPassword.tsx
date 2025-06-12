import React, { useState, useEffect } from 'react';
import Logo from 'public/logo.svg';
import ForgotPasswordImage from 'public/forgotPassword.png';
import { useNavigate } from 'react-router';
import back from 'public/back.svg';
import { forgotPassword } from '~/api/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.dismiss();
      toast.error('Email is required.');
      return;
    }

    if (!isValidEmail(email)) {
      toast.dismiss();
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await forgotPassword({ email });
      toast.dismiss();
      toast.success('A Verification code has been sent to your email.');
      setEmail('');

      navigate('/verifyCode', { state: { email } });
    } catch (error: any) {
      console.error('Forgot password error:', error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'An unexpected error occurred. Please try again later.';
      toast.dismiss();
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="px-32 py-10 h-screen">
      <div>
        <img src={Logo} alt="" height={'30px'} width={'30px'} />
        <div className=" flex items-start justify-between ">
          <div className="pt-30 w-[550px]">
            <a href="/login" className="flex gap-2 pl-2 pb-4 text-sm">
              <img src={back} alt="" width={10} height={10} />
              Back to login
            </a>
            <h1 className="text-5xl font-bold pb-3.5">Forgot your password?</h1>
            <p className="font-light text-gray-500 pt-5">
              Don’t worry, happens to all of us. Enter your email below to recover your password
            </p>

            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col pt-5">
                <input
                  value={email}
                  onChange={handleEmailChange}
                  type="text"
                  className="border border-gray-500 rounded-sm h-10 px-2"
                  placeholder="Email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer mt-10 text-white bg-blue-600 py-3 w-full rounded-sm ${loading ? 'bg-blue-400' : 'bg-blue-600'}
                  transition-colors duration-200 ease-in-out`}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          </div>
          <img
            src={ForgotPasswordImage}
            alt="login page"
            className=" pb-20"
            style={{ height: 'calc(100vh - 80px)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
