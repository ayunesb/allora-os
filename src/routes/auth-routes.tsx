
import { RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
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
    element: <Signup />,
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
