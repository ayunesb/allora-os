
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import LegalDocument from "@/pages/LegalDocument";
import FAQ from "@/pages/FAQ";
import Pricing from "@/pages/Pricing";
import NotFound from "@/pages/NotFound";
import DevAdminHelper from "@/pages/DevAdminHelper";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
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
    path: "/update-password",
    element: <UpdatePassword />,
  },
  {
    path: "/legal",
    element: <Legal />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/legal/cookies",
    element: <LegalDocument />,
  },
  {
    path: "/cookies",
    element: <CookiePolicy />,
  },
  {
    path: "/legal/refund-policy",
    element: <LegalDocument />,
  },
  {
    path: "/refund",
    element: <RefundPolicy />,
  },
  {
    path: "/legal/:documentId",
    element: <LegalDocument />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/dev-admin-helper",
    element: <DevAdminHelper />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
];
