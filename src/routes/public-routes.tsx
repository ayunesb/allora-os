
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import Privacy from "@/pages/Privacy";
import Legal from "@/pages/Legal";
import Pricing from "@/pages/Pricing";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import RefundPolicy from "@/pages/RefundPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import LegalDocument from "@/pages/LegalDocument";
import DevAdminHelper from "@/pages/DevAdminHelper";
import FAQ from "@/pages/FAQ";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/legal",
    element: <Legal />,
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy />,
  },
  {
    path: "/cookie-policy",
    element: <CookiePolicy />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/legal/:documentId",
    element: <LegalDocument />,
  },
  {
    path: "/dev-admin-helper",
    element: <DevAdminHelper />,
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccess />,
  },
];
