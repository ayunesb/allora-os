"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocialMediaCalendarPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var SocialMediaCalendar_1 = require("@/components/social-media/SocialMediaCalendar");
var card_1 = require("@/components/ui/card");
var react_helmet_async_1 = require("react-helmet-async");
var use_mobile_1 = require("@/hooks/use-mobile");
var useMediaQuery_1 = require("@/hooks/useMediaQuery");
var AccessibilityContext_1 = require("@/context/AccessibilityContext");
/**
 * Social Media Calendar page component
 * Provides a comprehensive calendar for planning and managing social media posts
 */
function SocialMediaCalendarPage() {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobile = ["xs", "mobile"].includes(breakpoint);
  var prefersDarkMode = (0, useMediaQuery_1.default)(
    "(prefers-color-scheme: dark)",
  );
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)(react_helmet_async_1.Helmet, {
        children: [
          (0, jsx_runtime_1.jsx)("title", {
            children: "Social Media Calendar | Allora AI",
          }),
          (0, jsx_runtime_1.jsx)("meta", {
            name: "description",
            content: "Plan and manage your social media content calendar",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "container mx-auto px-2 sm:px-4 py-4 sm:py-6",
        children: (0, jsx_runtime_1.jsx)(card_1.Card, {
          className: isMobile ? "p-3" : "p-6",
          role: "region",
          "aria-label": "Social Media Calendar",
          children: (0, jsx_runtime_1.jsx)(
            AccessibilityContext_1.AccessibilityProvider,
            {
              children: (0, jsx_runtime_1.jsx)(
                SocialMediaCalendar_1.default,
                {},
              ),
            },
          ),
        }),
      }),
    ],
  });
}
