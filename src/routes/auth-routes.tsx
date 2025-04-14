
import { RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import SignUpNew from "@/pages/SignUpNew";
import ResetPassword from "@/pages/ResetPassword";
import EmailConfirm from "@/pages/EmailConfirm";
import VerifyOtp from "@/pages/VerifyOtp";
import TiktokCallback from "@/components/auth/TiktokCallback";
import UpdatePassword from "@/pages/UpdatePassword";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUpNew />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "email-confirm",
    element: <EmailConfirm />,
  },
  {
    path: "verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "auth/tiktok/callback",
    element: <TiktokCallback />,
  },
];
