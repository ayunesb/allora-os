"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Index_1 = require("@/pages/Index");
var Home_1 = require("@/pages/Home");
var Pricing_1 = require("@/pages/Pricing");
var Privacy_1 = require("@/pages/Privacy");
var Legal_1 = require("@/pages/Legal");
var CheckoutSuccess_1 = require("@/pages/CheckoutSuccess");
var RefundPolicy_1 = require("@/pages/RefundPolicy");
var CookiePolicy_1 = require("@/pages/CookiePolicy");
var MessagingConsent_1 = require("@/pages/MessagingConsent");
var Compliance_1 = require("@/pages/Compliance");
var LegalDocument_1 = require("@/pages/LegalDocument");
var DevAdminHelper_1 = require("@/pages/DevAdminHelper");
var FAQ_1 = require("@/pages/FAQ");
var Contact_1 = require("@/pages/Contact");
var TermsOfService_1 = require("@/pages/TermsOfService");
exports.publicRoutes = [
  {
    path: "/welcome",
    element: (0, jsx_runtime_1.jsx)(Index_1.default, {}),
  },
  {
    path: "/home",
    element: (0, jsx_runtime_1.jsx)(Home_1.default, {}),
  },
  {
    path: "/pricing",
    element: (0, jsx_runtime_1.jsx)(Pricing_1.default, {}),
  },
  {
    path: "/privacy",
    element: (0, jsx_runtime_1.jsx)(Privacy_1.default, {}),
  },
  {
    path: "/legal",
    element: (0, jsx_runtime_1.jsx)(Legal_1.default, {}),
  },
  {
    path: "/refund-policy",
    element: (0, jsx_runtime_1.jsx)(RefundPolicy_1.default, {}),
  },
  {
    path: "/cookie-policy",
    element: (0, jsx_runtime_1.jsx)(CookiePolicy_1.default, {}),
  },
  {
    path: "/messaging-consent",
    element: (0, jsx_runtime_1.jsx)(MessagingConsent_1.default, {}),
  },
  {
    path: "/compliance",
    element: (0, jsx_runtime_1.jsx)(Compliance_1.default, {}),
  },
  {
    path: "/faq",
    element: (0, jsx_runtime_1.jsx)(FAQ_1.default, {}),
  },
  {
    path: "/legal/:documentId",
    element: (0, jsx_runtime_1.jsx)(LegalDocument_1.default, {}),
  },
  {
    path: "/dev-admin-helper",
    element: (0, jsx_runtime_1.jsx)(DevAdminHelper_1.default, {}),
  },
  {
    path: "/checkout-success",
    element: (0, jsx_runtime_1.jsx)(CheckoutSuccess_1.default, {}),
  },
  {
    path: "/contact",
    element: (0, jsx_runtime_1.jsx)(Contact_1.default, {}),
  },
  {
    path: "/legal/terms-of-service",
    element: (0, jsx_runtime_1.jsx)(TermsOfService_1.default, {}),
  },
];
exports.default = exports.publicRoutes;
