import type { IForm, LoginData, forgotPasswordData, verifyCodeData, resetPasswordData, updateUserData } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type SignupData = IForm;
import { useAuthStore } from "~/store/authStore";

export const signup = async (formData: SignupData) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const login = async(formData: LoginData) =>{
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;

    }

export const logout = async() =>{
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Logout failed");
    }

    return data;

}

export const authenticationStatus = async () =>{
  const response = await fetch(`${BASE_URL}/auth/status`, {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 401) {
    return null; 
  }

  const data = await response.json();

  if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
  }

  return data;
  }

export const googleLogin = async () =>{
  try {
  const response = await fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      credentials: "include"
  });

    const { url } = await response.json(); 
    window.location.href = url;
  } catch (error) {
    console.error("Google login error:", error);
  }
}

export const forgotPassword = async(formData: forgotPasswordData) =>{
  const response = await fetch(`${BASE_URL}/auth/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
  })

  const data = await response.json();

  if (!response.ok) {
      throw new Error(data.message || "Password reset failed");
  }

  return data;

  }

  export const verifyCode = async(formData: verifyCodeData) =>{
    const response = await fetch(`${BASE_URL}/auth/password-reset/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    })
  
    const data = await response.json();
  
    if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
    }
  
    return data;
  
    }

    export const resetPassword = async(formData: resetPasswordData) =>{
      const response = await fetch(`${BASE_URL}/auth/password-reset/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
      })
    
      const data = await response.json();
    
      if (!response.ok) {
          throw new Error(data.message || "Password reset failed");
      }
    
      return data;
    
      }

      export const updateUserProfile = async(formData: updateUserData) =>{

        const response = await fetch(`${BASE_URL}/user/edit`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials: "include"
        })
    
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || "Failed to update user info");
        }
    
        return data;
    
        }