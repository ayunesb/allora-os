import { RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    async lazy() {
      const { default: Login } = await import("@/pages/Login");
      return { Component: Login };
    },
  },
  {
    path: "auth/login",
    async lazy() {
      const { default: Login } = await import("@/pages/Login");
      return { Component: Login };
    },
  },
  {
    path: "signup",
    async lazy() {
      const { default: SignUpNew } = await import("@/pages/SignUpNew");
      return { Component: SignUpNew };
    },
  },
  {
    path: "reset-password",
    async lazy() {
      const { default: ResetPassword } = await import("@/pages/ResetPassword");
      return { Component: ResetPassword };
    },
  },
  {
    path: "email-confirm",
    async lazy() {
      const { default: EmailConfirm } = await import("@/pages/EmailConfirm");
      return { Component: EmailConfirm };
    },
  },
  {
    path: "verify-otp",
    async lazy() {
      const { default: VerifyOtp } = await import("@/pages/VerifyOtp");
      return { Component: VerifyOtp };
    },
  },
  {
    path: "update-password",
    async lazy() {
      const { default: UpdatePassword } = await import(
        "@/pages/UpdatePassword"
      );
      return { Component: UpdatePassword };
    },
  },
  {
    path: "auth/tiktok/callback",
    async lazy() {
      const { default: TiktokCallback } = await import(
        "@/components/auth/TiktokCallback"
      );
      return { Component: TiktokCallback };
    },
  },
];
