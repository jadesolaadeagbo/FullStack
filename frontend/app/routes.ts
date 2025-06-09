import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("login", "routes/login/PublicLogin.tsx"),
    route("signup", "routes/signup/signup.tsx"),
    route("forgotPassword", "routes/forgotPassword/forgotPassword.tsx"),
    route("verifyCode", "routes/verifyCode/verifyCode.tsx"),
    route("setPassword", "routes/setPassword/setPassword.tsx"),
    route("userProfile", "routes/userProfile/ProtectedUserProfile.tsx"),
    route("auth/loading", "routes/OAuthLoading.tsx"),


] satisfies RouteConfig;
