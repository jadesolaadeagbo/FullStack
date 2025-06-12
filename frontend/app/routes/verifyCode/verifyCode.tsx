import { useEffect, useState } from 'react';
import Logo from 'public/logo.svg';
import LoginImage from 'public/login.png';
import back from 'public/back.svg';
import { useLocation, useNavigate } from 'react-router';
import { verifyCode } from '~/api/auth';
import { toast } from 'react-toastify';

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const email = (location.state as { email: string })?.email;

  useEffect(() => {
    if (!email) {
      toast.dismiss();
      toast.error('No email found. Please request a new code.');
      navigate('/forgotPassword');
    }
  }, [email, navigate]);

  useEffect(() => {
    document.title = 'Verify Code';
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      toast.dismiss();
      toast.error('Please enter a valid verification code.');
      return;
    }
    setLoading(true);
    try {
      await verifyCode({ email, code });
      toast.dismiss();
      toast.success('Code verified successfully!');

      setCode('');
      navigate('/setPassword', { state: { email, code } });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-32 py-10 h-screen">
      <div>
        <img src={Logo} alt="Company Logo" height={30} width={30} />
        <div className="flex items-start justify-between">
          <div className="pt-30 w-[550px]">
            <a href="/login" className="flex gap-2 pl-2 pb-4 text-sm">
              <img src={back} alt="Back" width={10} height={10} />
              Back to login
            </a>
            <h1 className="text-5xl font-bold pb-5">Verify Code</h1>
            <p className="font-light text-gray-500 pt-5">
              An authentication code has been sent to your email.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col pt-5">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{4,6}"
                  maxLength={6}
                  required
                  className="border border-gray-500 rounded-sm h-10 px-2"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <span className="flex pt-2 text-sm">
                Didn’t receive a code?&nbsp;
                <a href="/forgotPassword" className="text-red-400">
                  Resend
                </a>
              </span>

              <button
                type="submit"
                disabled={loading}
                className={`mt-10 w-full py-3 rounded-sm text-white 
                  ${loading ? 'bg-blue-400' : 'bg-blue-600'}
                  ${loading ? 'cursor-not-allowed' : 'cursor-pointer '}
                  transition-colors duration-200 ease-in-out`}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          </div>

          <img
            src={LoginImage}
            alt="Verification Illustration"
            className="pb-20"
            style={{ height: 'calc(100vh - 80px)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
