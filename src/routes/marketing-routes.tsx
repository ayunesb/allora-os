
import { RouteObject } from "react-router-dom";
import Pricing from "@/pages/Pricing";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import Compliance from "@/pages/Compliance";
import FAQ from "@/pages/FAQ";

export const marketingRoutes: RouteObject[] = [
  {
    path: "/pricing",
    element: <Pricing />,
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
    path: "/cookie-policy",
    element: <CookiePolicy />,
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy />,
  },
  {
    path: "/compliance",
    element: <Compliance />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
];
