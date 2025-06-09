import React, { useState, useEffect } from 'react';
import Logo from "public/logo.svg";
import SignupImage from "public/signup.png";
import gmail from "public/google.svg";
import eye from "public/eye.svg";
import eyeOff from "public/eye-off.svg";
import { googleLogin, signup } from '~/api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import type { IForm, IFormErrors } from '../../types';


const Signup = () => {
  useEffect(() => {
    document.title = 'Signup';
  }, []);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);


  const [formData, setFormData] = useState<IForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const validate = () => {
    const errors: IFormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(formData.phone)) errors.phone = 'Enter a valid phone number';
   

  if (!formData.password) {
    errors.password = 'Password is required';
  } else {
    const password = formData.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }
  }
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== formData.password) errors.confirmPassword = 'Passwords do not match';
    if (!terms) errors.terms = 'You must agree to the terms';
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if ( name === "confirmPassword" ){
      setConfirmPassword(value)
    } else if(name==="terms"){
      setTerms(checked)
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const errors = validate();
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        const response = await signup(formData);
  
        if (response?.status === 201 || response?.data?.success) {
          toast.success("Signup successful!");
          
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
          });
          setConfirmPassword('');
          setTerms(false);
  
          navigate("/login");
        } else {
          toast.error(response?.data?.message || "Signup failed. Please try again.");
        }
  
      } catch (error: any) {
        console.error("Signup error:", error);
        toast.error(
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong during signup."
        );
      }
    } else {
      toast.error("Please fix the form errors.");
    }
  };
  

  const handleGoogleSignup = async() => {
    try {
    await googleLogin();
    } catch (error) {
      
    }
  }
  

  return (
    <div className='px-32 py-10 h-screen'>
      <div>
        <div className='flex justify-end'>
          <img src={Logo} alt="Logo" height={"30px"} width={"30px"} />
        </div>

        <div className='flex items-start justify-between'>
          <img
            src={SignupImage}
            alt="signup"
            className='pb-20'
            style={{ height: 'calc(100vh - 80px)' }}
          />

          <div className='pt-10 w-[700px]'>
            <h1 className='text-5xl font-bold pb-3.5'>Sign up</h1>
            <p className='font-light text-gray-500'>Let’s get you all set up so you can access your personal account.</p>

            <form onSubmit={handleSubmit} className='pb-10'>
              <div className='flex gap-5 pt-5'>
                <div className='w-1/2'>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className='border border-gray-500 rounded-sm h-10 px-2 w-full'
                    placeholder='First Name'
                  />
                  {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                </div>

                <div className='w-1/2'>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className='border border-gray-500 rounded-sm h-10 px-2 w-full'
                    placeholder='Last Name'
                  />
                  {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                </div>
              </div>

              <div className='flex gap-5 pt-5'>
                <div className='w-1/2'>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className='border border-gray-500 rounded-sm h-10 px-2 w-full'
                    placeholder='Email'
                  />
                  {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>

                <div className='w-1/2'>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className='border border-gray-500 rounded-sm h-10 px-2 w-full'
                    placeholder='Phone Number'
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                </div>
              </div>

              <div className='flex flex-col pt-5 relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className='border border-gray-500 rounded-sm h-10 px-2'
                  placeholder='Password'
                />
                <span
                  className='absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600'
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  <img src={showPassword ? eye : eyeOff} width={20} />
                </span>
                {formErrors.password && <p className="text-red-500 text-sm pt-1">{formErrors.password}</p>}
              </div>

              <div className='flex flex-col pt-5 relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  className='border border-gray-500 rounded-sm h-10 px-2'
                  placeholder='Confirm Password'
                />
                <span
                  className='absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600'
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  <img src={showConfirmPassword ? eye : eyeOff} width={20} />
                </span>
                {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
              </div>

              <div className='flex items-center pt-6 gap-2'>
                <input
                  type="checkbox" 
                  name="terms"
                  className='cursor-pointer'
                  checked={terms}
                  onChange={handleChange}
                />
                <span className='text-sm flex gap-1'>
                  I agree to all the <p className='text-red-400'>Terms</p> and <p className='text-red-400'>Privacy Policies</p>
                </span>
              </div>
              {formErrors.terms && <p className="text-red-500 text-sm">{formErrors.terms}</p>}

              <button type="submit" className='mt-10 text-white bg-blue-600 py-3 w-full rounded-sm cursor-pointer'>
                Create Account
              </button>

              <span className='text-center flex pt-5 justify-center'>
                Already have an account? &nbsp;
                <a href='/login' className='text-red-400'>Log in</a>
              </span>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-4 text-gray-500">or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>


            </form>

            <button className='cursor-pointer border border-gray-400 py-2 w-full rounded-sm flex justify-center mt-5' onClick={handleGoogleSignup}>
                <img src={gmail} alt="" height={20} width={20} /> &nbsp;
                Sign up with Google
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
