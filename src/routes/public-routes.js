import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Privacy from "@/pages/Privacy";
import Legal from "@/pages/Legal";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import RefundPolicy from "@/pages/RefundPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import MessagingConsent from "@/pages/MessagingConsent";
import Compliance from "@/pages/Compliance";
import LegalDocument from "@/pages/LegalDocument";
import DevAdminHelper from "@/pages/DevAdminHelper";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import TermsOfService from "@/pages/TermsOfService";
export const publicRoutes = [
    {
        path: "/welcome",
        element: <Index />,
    },
    {
        path: "/home",
        element: <Home />,
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
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "/legal/terms-of-service",
        element: <TermsOfService />,
    },
];
export default publicRoutes;
