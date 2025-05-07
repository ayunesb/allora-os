import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(Index, {}),
    },
    {
        path: "/home",
        element: _jsx(Home, {}),
    },
    {
        path: "/pricing",
        element: _jsx(Pricing, {}),
    },
    {
        path: "/privacy",
        element: _jsx(Privacy, {}),
    },
    {
        path: "/legal",
        element: _jsx(Legal, {}),
    },
    {
        path: "/refund-policy",
        element: _jsx(RefundPolicy, {}),
    },
    {
        path: "/cookie-policy",
        element: _jsx(CookiePolicy, {}),
    },
    {
        path: "/messaging-consent",
        element: _jsx(MessagingConsent, {}),
    },
    {
        path: "/compliance",
        element: _jsx(Compliance, {}),
    },
    {
        path: "/faq",
        element: _jsx(FAQ, {}),
    },
    {
        path: "/legal/:documentId",
        element: _jsx(LegalDocument, {}),
    },
    {
        path: "/dev-admin-helper",
        element: _jsx(DevAdminHelper, {}),
    },
    {
        path: "/checkout-success",
        element: _jsx(CheckoutSuccess, {}),
    },
    {
        path: "/contact",
        element: _jsx(Contact, {}),
    },
    {
        path: "/legal/terms-of-service",
        element: _jsx(TermsOfService, {}),
    },
];
export default publicRoutes;
