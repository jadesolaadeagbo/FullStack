import React, { useState, useEffect } from 'react';
import eye from 'public/eye.svg';
import eyeOff from 'public/eye-off.svg';
import AdminRoute from '../AdminRoute';
import type { IForm, IFormErrors } from '~/types';

const CreateAdmin = () => {
  React.useEffect(() => {
    document.title = 'Create Admin';
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<IForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AdminRoute>
      <div className="w-[50vw]">
        <h1 className="text-xl font-semibold">Create Admin</h1>
        <div className=" ">
          <form>
            <div className="flex gap-5 pt-15">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-sm h-10 px-2 w-full"
                  placeholder="First Name"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                )}
              </div>

              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-sm h-10 px-2 w-full"
                  placeholder="Last Name"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                )}
              </div>
            </div>

            <div className="flex gap-5 pt-5">
              <div className="w-1/2">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-sm h-10 px-2 w-full"
                  placeholder="Email"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <div className="w-1/2">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-sm h-10 px-2 w-full"
                  placeholder="Phone Number"
                />
                {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
              </div>
            </div>

            <div className="flex flex-col pt-5 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-500 rounded-sm h-10 px-2"
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img src={showPassword ? eyeOff : eye} width={20} />
              </span>
              {formErrors.password && (
                <p className="text-red-500 text-sm pt-1">{formErrors.password}</p>
              )}
            </div>

            <div className="flex flex-col pt-5 relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="border border-gray-500 rounded-sm h-10 px-2"
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <img src={showConfirmPassword ? eyeOff : eye} width={20} />
              </span>
            </div>

            <button
              type="submit"
              className="mt-10 text-white bg-blue-900 py-3 w-full rounded-sm cursor-pointer"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </AdminRoute>
  );
};

export default CreateAdmin;
