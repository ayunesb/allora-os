"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var toaster_1 = require("@/components/ui/toaster");
var theme_provider_1 = require("@/components/theme-provider");
var react_helmet_async_1 = require("react-helmet-async");
var react_query_1 = require("@tanstack/react-query");
var GlobalErrorBoundary_1 = require("@/components/errorHandling/GlobalErrorBoundary");
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var skeleton_1 = require("@/components/ui/skeleton"); // if using shadcn
var Galaxy_1 = require("@/pages/Galaxy");
var queryClient = new react_query_1.QueryClient();
function RootLayout() {
  var location = (0, react_router_dom_1.useLocation)();
  return (0, jsx_runtime_1.jsx)(GlobalErrorBoundary_1.GlobalErrorBoundary, {
    children: (0, jsx_runtime_1.jsx)(react_helmet_async_1.HelmetProvider, {
      children: (0, jsx_runtime_1.jsx)(theme_provider_1.ThemeProvider, {
        defaultTheme: "dark",
        storageKey: "allora-theme",
        children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, {
          client: queryClient,
          children: (0, jsx_runtime_1.jsx)("div", {
            className:
              "min-h-screen text-white bg-gradient-to-br from-[#0A0A23] to-[#1A1A40] bg-fixed",
            children: (0, jsx_runtime_1.jsx)("body", {
              className: "bg-gradient-futuristic text-foreground",
              children: (0, jsx_runtime_1.jsx)("div", {
                id: "root",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "min-h-screen bg-background text-foreground antialiased",
                  children: [
                    (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, {
                      mode: "wait",
                      children: (0, jsx_runtime_1.jsx)(
                        framer_motion_1.motion.div,
                        {
                          initial: { opacity: 0, y: 12 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0, y: -6 },
                          transition: { duration: 0.25, ease: "easeOut" },
                          className: "min-h-screen",
                          children: (0, jsx_runtime_1.jsx)(react_1.Suspense, {
                            fallback: (0, jsx_runtime_1.jsx)(
                              skeleton_1.Skeleton,
                              { className: "h-[500px] w-full" },
                            ),
                            children:
                              location.pathname === "/galaxy"
                                ? (0, jsx_runtime_1.jsx)(Galaxy_1.default, {})
                                : (0, jsx_runtime_1.jsx)(
                                    react_router_dom_1.Outlet,
                                    {},
                                  ),
                          }),
                        },
                        location.pathname,
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(toaster_1.Toaster, {}),
                  ],
                }),
              }),
            }),
          }),
        }),
      }),
    }),
  });
}
