import { RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import EmailConfirm from "@/pages/EmailConfirm";
import VerifyOtp from "@/pages/VerifyOtp";
import MetaCallback from "@/components/auth/MetaCallback";
import TiktokCallback from "@/components/auth/TiktokCallback";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/email-confirm",
    element: <EmailConfirm />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/auth/meta/callback",
    element: <MetaCallback />,
  },
  {
    path: "/auth/tiktok/callback",
    element: <TiktokCallback />,
  },
];
