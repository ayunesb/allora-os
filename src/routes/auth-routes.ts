
import { RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    async lazy() {
      const { default: Login } = await import("@/pages/Login");
      return { element: <Login /> };
    }
  },
  {
    path: "auth/login",
    async lazy() {
      const { default: Login } = await import("@/pages/Login");
      return { element: <Login /> };
    }
  },
  {
    path: "signup",
    async lazy() {
      const { default: SignUpNew } = await import("@/pages/SignUpNew");
      return { element: <SignUpNew /> };
    }
  },
  {
    path: "reset-password",
    async lazy() {
      const { default: ResetPassword } = await import("@/pages/ResetPassword");
      return { element: <ResetPassword /> };
    }
  },
  {
    path: "email-confirm",
    async lazy() {
      const { default: EmailConfirm } = await import("@/pages/EmailConfirm");
      return { element: <EmailConfirm /> };
    }
  },
  {
    path: "verify-otp",
    async lazy() {
      const { default: VerifyOtp } = await import("@/pages/VerifyOtp");
      return { element: <VerifyOtp /> };
    }
  },
  {
    path: "update-password",
    async lazy() {
      const { default: UpdatePassword } = await import("@/pages/UpdatePassword");
      return { element: <UpdatePassword /> };
    }
  },
  {
    path: "auth/tiktok/callback",
    async lazy() {
      const { default: TiktokCallback } = await import("@/components/auth/TiktokCallback");
      return { element: <TiktokCallback /> };
    }
  }
];
