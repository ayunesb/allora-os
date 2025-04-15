
import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("@/pages/Login"));
const SignUpNew = lazy(() => import("@/pages/SignUpNew"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const EmailConfirm = lazy(() => import("@/pages/EmailConfirm"));
const VerifyOtp = lazy(() => import("@/pages/VerifyOtp"));
const TiktokCallback = lazy(() => import("@/components/auth/TiktokCallback"));
const UpdatePassword = lazy(() => import("@/pages/UpdatePassword"));

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />
  },
  {
    path: "auth/login",
    element: <Login />
  },
  {
    path: "signup",
    element: <SignUpNew />
  },
  {
    path: "reset-password",
    element: <ResetPassword />
  },
  {
    path: "email-confirm",
    element: <EmailConfirm />
  },
  {
    path: "verify-otp",
    element: <VerifyOtp />
  },
  {
    path: "update-password",
    element: <UpdatePassword />
  },
  {
    path: "auth/tiktok/callback",
    element: <TiktokCallback />
  }
];
