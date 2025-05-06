"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Index;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Navbar_1 = require("@/components/Navbar"); // Changed from { Navbar } to default import
var Footer_1 = require("@/components/Footer");
var Hero_1 = require("@/components/home/Hero");
var Features_1 = require("@/components/home/Features");
var Testimonials_1 = require("@/components/home/Testimonials");
var CallToAction_1 = require("@/components/home/CallToAction");
var TrustBadges_1 = require("@/components/home/TrustBadges");
var InteractiveDemo_1 = require("@/components/home/InteractiveDemo");
var OutcomeShowcase_1 = require("@/components/home/OutcomeShowcase");
var CookieConsent_1 = require("@/components/CookieConsent");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var loggingService_1 = require("@/utils/loggingService");
function Index() {
  (0, react_1.useEffect)(function () {
    loggingService_1.logger.info("Index component mounted");
    return function () {
      return loggingService_1.logger.info("Index component unmounted");
    };
  }, []);
  return (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "min-h-screen bg-background flex flex-col",
      children: [
        (0, jsx_runtime_1.jsx)(Navbar_1.default, {}),
        (0, jsx_runtime_1.jsxs)("main", {
          className: "flex flex-col items-center flex-grow",
          children: [
            (0, jsx_runtime_1.jsx)(Hero_1.default, {}),
            (0, jsx_runtime_1.jsx)(TrustBadges_1.default, {}),
            (0, jsx_runtime_1.jsx)(InteractiveDemo_1.default, {}),
            (0, jsx_runtime_1.jsx)(OutcomeShowcase_1.default, {}),
            (0, jsx_runtime_1.jsx)(Features_1.default, {}),
            (0, jsx_runtime_1.jsx)(Testimonials_1.default, {}),
            (0, jsx_runtime_1.jsx)(CallToAction_1.default, {}),
          ],
        }),
        (0, jsx_runtime_1.jsx)(Footer_1.default, {}),
        (0, jsx_runtime_1.jsx)(CookieConsent_1.default, {}),
      ],
    }),
  });
}
