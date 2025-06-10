export interface IForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }
  
export interface IFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }

export interface LoginData {
    email: string;
    password: string;
}

export interface User{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    refetchUser: () => Promise<void>;
  };

export interface forgotPasswordData {
    email: string;
  };

  export interface verifyCodeData {
    email: string;
    code: string;
  };

  export interface resetPasswordData {
    email: string;
    code: string;
    newPassword: string;
  };

  export interface updateUserData {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }