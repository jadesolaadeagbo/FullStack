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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
}

export interface forgotPasswordData {
  email: string;
}

export interface verifyCodeData {
  email: string;
  code: string;
}

export interface resetPasswordData {
  email: string;
  code: string;
  newPassword: string;
}

export interface updateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface IProduct {
  _id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  productImage?: string;
}
export interface IStore {
  _id: string;
  name: string;
  description?: string;
  location: string;
  storeImage: string;
  createdAt: string;
  products: IProduct;
}

export interface ProductResponse {
  products: IProduct[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface StoreResponse {
  shops: IStore[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface CreateShopData {
  name: string;
  description: string;
  location: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  storeId: string;
}

export interface UpdateShopData {
  name?: string;
  description?: string;
  location?: string;
}
