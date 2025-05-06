"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var sonner_1 = require("sonner");
var ThemeContext_1 = require("./context/ThemeContext");
var AuthContext_1 = require("./context/AuthContext");
var GlobalErrorBoundary_1 = require("./components/errorHandling/GlobalErrorBoundary");
var errorLogging_1 = require("./utils/errorHandling/errorLogging");
var GlobalErrorModal_1 = require("./components/errorHandling/GlobalErrorModal");
var CompanyAPIContext_1 = require("./context/CompanyAPIContext");
var analytics_1 = require("./utils/analytics");
var AccessibilityContext_1 = require("./context/AccessibilityContext");
var CookieConsent_1 = require("./components/CookieConsent");
var react_router_dom_1 = require("react-router-dom");
var router_1 = require("./routes/router");
var react_helmet_async_1 = require("react-helmet-async");
var _id_1 = require("@/pages/plugin/[id]");
var _id_2 = require("@/pages/strategy/[id]");
var App = function () {
  react_1.default.useEffect(function () {
    // Initialize error logging
    (0, errorLogging_1.setupErrorLogging)();
    // Initialize analytics (only if consent is given)
    var cookieConsent = localStorage.getItem("cookie-consent");
    if (cookieConsent) {
      var settings = JSON.parse(cookieConsent);
      if (
        settings === null || settings === void 0 ? void 0 : settings.analytics
      ) {
        (0, analytics_1.initializeAnalytics)();
      }
    }
  }, []);
  return (0, jsx_runtime_1.jsx)(GlobalErrorBoundary_1.GlobalErrorBoundary, {
    children: (0, jsx_runtime_1.jsx)(ThemeContext_1.ThemeProvider, {
      children: (0, jsx_runtime_1.jsx)(AuthContext_1.AuthProvider, {
        children: (0, jsx_runtime_1.jsx)(
          AccessibilityContext_1.AccessibilityProvider,
          {
            children: (0, jsx_runtime_1.jsxs)(
              CompanyAPIContext_1.CompanyAPIProvider,
              {
                children: [
                  (0, jsx_runtime_1.jsxs)(react_helmet_async_1.Helmet, {
                    children: [
                      (0, jsx_runtime_1.jsx)("title", {
                        children: "Allora OS \u2013 AI-Native Business System",
                      }),
                      (0, jsx_runtime_1.jsx)("meta", {
                        name: "description",
                        content:
                          "Allora OS helps startups run 90% autonomously with AI agents and strategy automation.",
                      }),
                      (0, jsx_runtime_1.jsx)("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1",
                      }),
                      (0, jsx_runtime_1.jsx)("meta", {
                        property: "og:title",
                        content: "Allora OS",
                      }),
                      (0, jsx_runtime_1.jsx)("meta", {
                        property: "og:description",
                        content:
                          "Run your startup like a pro\u2014with autonomous AI execution.",
                      }),
                      (0, jsx_runtime_1.jsx)("meta", {
                        property: "og:url",
                        content: "https://allora-os.vercel.app",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(react_router_dom_1.RouterProvider, {
                    router: router_1.router,
                  }),
                  (0, jsx_runtime_1.jsx)(react_1.Suspense, {
                    fallback: (0, jsx_runtime_1.jsx)("div", {
                      className: "p-8 text-white",
                      children: "Loading Galaxy...",
                    }),
                    children: (0, jsx_runtime_1.jsxs)(
                      react_router_dom_1.Routes,
                      {
                        children: [
                          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
                            path: "/plugin/:id",
                            element: (0, jsx_runtime_1.jsx)(_id_1.default, {}),
                          }),
                          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
                            path: "/strategy/:id",
                            element: (0, jsx_runtime_1.jsx)(_id_2.default, {}),
                          }),
                          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
                            path: "*",
                            element: (0, jsx_runtime_1.jsx)("div", {
                              children: "404 Not Found",
                            }),
                          }),
                        ],
                      },
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(sonner_1.Toaster, {
                    position: "top-right",
                  }),
                  (0, jsx_runtime_1.jsx)(
                    GlobalErrorModal_1.GlobalErrorModal,
                    {},
                  ),
                  (0, jsx_runtime_1.jsx)(CookieConsent_1.default, {}),
                  (0, jsx_runtime_1.jsx)("div", {
                    id: "aria-live-polite",
                    className: "sr-only",
                    "aria-live": "polite",
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    id: "aria-live-assertive",
                    className: "sr-only",
                    "aria-live": "assertive",
                  }),
                ],
              },
            ),
          },
        ),
      }),
    }),
  });
};
exports.default = App;
