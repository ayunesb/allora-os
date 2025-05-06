import { RouteObject } from "react-router-dom";
import Pricing from "@/pages/Pricing";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import Compliance from "@/pages/Compliance";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import TermsOfService from "@/pages/TermsOfService";
import MessagingConsent from "@/pages/MessagingConsent";
import GDPRCompliance from "@/pages/GDPRCompliance";
import CookieSettings from "@/pages/CookieSettings";

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
    path: "/messaging-consent",
    element: <MessagingConsent />,
  },
  {
    path: "/compliance",
    element: <Compliance />,
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
    path: "/legal/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/terms",
    element: <TermsOfService />,
  },
  {
    path: "/legal/privacy-policy",
    element: <Privacy />,
  },
  {
    path: "/legal/cookies",
    element: <CookiePolicy />,
  },
  {
    path: "/legal/compliance",
    element: <Compliance />,
  },
  {
    path: "/legal/refund-policy",
    element: <RefundPolicy />,
  },
  {
    path: "/legal/messaging-consent",
    element: <MessagingConsent />,
  },
  // New GDPR compliance routes
  {
    path: "/gdpr",
    element: <GDPRCompliance />,
  },
  {
    path: "/legal/gdpr",
    element: <GDPRCompliance />,
  },
  {
    path: "/compliance/gdpr",
    element: <GDPRCompliance />,
  },
  // New Cookie Settings routes
  {
    path: "/cookie-settings",
    element: <CookieSettings />,
  },
  {
    path: "/legal/cookie-settings",
    element: <CookieSettings />,
  },
];

export default marketingRoutes;
