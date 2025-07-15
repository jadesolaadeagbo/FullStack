import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/authentication/login/PublicLogin.tsx'),
  route('signup', 'routes/authentication/signup/signup.tsx'),
  route('forgotPassword', 'routes/authentication/forgotPassword/forgotPassword.tsx'),
  route('verifyCode', 'routes/authentication/verifyCode/verifyCode.tsx'),
  route('setPassword', 'routes/authentication/setPassword/setPassword.tsx'),
  route('userProfile', 'routes/authentication/userProfile/ProtectedUserProfile.tsx'),
  route('auth/loading', 'routes/authentication/OAuthLoading.tsx'),
  route('shop', 'routes/shop/index.tsx'),
  route('shop/cart', 'routes/shop/ViewCart.tsx'),

  layout('routes/admin/Sidebar.tsx', [
    route('dashboard', 'routes/admin/Dashboard.tsx'),
    route('dashboard/stores', 'routes/admin/ShopDashboard.tsx'),
    route('dashboard/products', 'routes/admin/ProductsDashboard.tsx'),
    route('create-admin', 'routes/admin/CreateAdmin.tsx'),
  ]),
] satisfies RouteConfig;
