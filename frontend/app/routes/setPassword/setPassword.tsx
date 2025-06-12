import React, { useState, useEffect } from 'react';
import Logo from 'public/logo.svg';
import forgotPasswordImage from 'public/forgotPassword.png';
import eye from 'public/eye.svg';
import eyeOff from 'public/eye-off.svg';
import back from 'public/back.svg';
import { useNavigate, useLocation } from 'react-router';
import { resetPassword } from '~/api/auth';
import { toast } from 'react-toastify';

const SetPassword = () => {
  useEffect(() => {
    document.title = 'Set New Password';
  }, []);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ newPassword?: string; confirmNewPassword?: string }>({});

  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const email = (location.state as { email: string })?.email;
  const code = (location.state as { code: string })?.code;

  useEffect(() => {
    if (!email || !code) {
      toast.dismiss();
      toast.error('Access denied. Please start the password reset process again.');
      navigate('/forgotPassword');
    }
  }, [email, code, navigate]);

  const validate = () => {
    const errors: { newPassword?: string; confirmNewPassword?: string } = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!newPassword) {
      errors.newPassword = 'Password is required';
    } else if (!passwordRegex.test(newPassword)) {
      errors.newPassword =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (!confirmNewPassword) {
      errors.confirmNewPassword = 'Please confirm your password';
    } else if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setErrors({});

    try {
      await resetPassword({ email, code, newPassword });
      toast.dismiss();
      toast.success('Password reset successfully. Confirmation sent to your email.');
      navigate('/login');
    } catch (error: unknown) {
      const message = (error as { message?: string })?.message || 'Something went wrong';
      toast.dismiss();
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-32 py-10 h-screen">
      <div>
        <img src={Logo} alt="logo" height="30px" width="30px" />
        <div className="flex items-start justify-between">
          <div className="pt-30 w-[550px]">
            <a href="/login" className="flex gap-2 pl-2 pb-4 text-sm">
              <img src={back} alt="Back" width={10} height={10} />
              Back to login
            </a>
            <h1 className="text-5xl font-bold pb-3.5">Set a password</h1>
            <p className="font-light text-gray-500 pt-5">
              Your previous password has been reset. Please set a new password for your account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col pt-5 relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-500 rounded-sm h-10 px-2"
                  placeholder="Password"
                />
                <span
                  className="absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <img src={eyeOff} width={20} /> : <img src={eye} width={20} />}
                </span>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col pt-5 relative">
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="border border-gray-500 rounded-sm h-10 px-2"
                  placeholder="Confirm Password"
                />
                <span
                  className="absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                >
                  {showConfirmNewPassword ? (
                    <img src={eyeOff} width={20} />
                  ) : (
                    <img src={eye} width={20} />
                  )}
                </span>
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-10 w-full py-3 rounded-sm text-white 
                  ${loading ? 'bg-blue-400' : 'bg-blue-600'}
                  ${loading ? 'cursor-not-allowed' : 'cursor-pointer '}
                  transition-colors duration-200 ease-in-out`}
              >
                {loading ? 'Submitting...' : 'Set Password'}
              </button>
            </form>
          </div>

          <img
            src={forgotPasswordImage}
            alt="login page"
            className="pb-20"
            style={{ height: 'calc(100vh - 80px)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
