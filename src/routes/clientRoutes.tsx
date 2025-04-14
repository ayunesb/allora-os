
import { Navigate, RouteObject } from "react-router-dom";
import NotFound from "@/pages/404";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import PrivacyPolicy from "@/pages/LegalDocument"; // Using LegalDocument instead of PrivacyPolicy
import TermsOfService from "@/pages/LegalDocument"; // Using LegalDocument instead of TermsOfService
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/FAQ"; // Using FAQ as a temporary replacement
import ForgotPassword from "@/pages/EmailConfirm"; // Using EmailConfirm as a temporary replacement
import ThankYou from "@/pages/CheckoutSuccess"; // Using CheckoutSuccess as a temporary replacement
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import Billing from "@/pages/Billing";
import Index from "@/pages/Index"; // Using Index instead of Landing

export const clientRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />, // Using Index component instead of Landing
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Login />, // Using Login as a temporary replacement for Signup
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
  },
  {
    path: "/payment-success",
    element: <CheckoutSuccess />,
  },
  {
    path: "/billing",
    element: <Billing />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
