
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
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
    errorElement: <NotFound />,
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
];
