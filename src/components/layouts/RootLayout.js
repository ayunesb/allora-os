"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var toaster_1 = require("@/components/ui/toaster");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var errorHandling_1 = require("@/utils/api/errorHandling");
var loggingService_1 = require("@/utils/loggingService");
var AccessibilityPanel_1 = require("@/components/accessibility/AccessibilityPanel");
var HelpContext_1 = require("@/context/HelpContext");
var HelpModal_1 = require("@/components/help/HelpModal");
var AccessibilityAnnouncer_1 = require("@/components/accessibility/AccessibilityAnnouncer");
var react_router_dom_2 = require("react-router-dom");
function RootLayout() {
  // Apply any global effects or settings when the root layout mounts
  react_1.default.useEffect(function () {
    try {
      loggingService_1.logger.info("RootLayout mounted");
      document.documentElement.classList.add("antialiased");
      (0, errorHandling_1.setupAccessibleErrorHandling)();
      return function () {
        loggingService_1.logger.info("RootLayout unmounted");
        document.documentElement.classList.remove("antialiased");
      };
    } catch (error) {
      loggingService_1.logger.error("Error in RootLayout useEffect:", error);
    }
  }, []);
  // Check if we're inside a Router context to safely render AccessibilityAnnouncer
  var isRouterContextAvailable = true;
  try {
    // This will throw if not in Router context
    (0, react_router_dom_1.useLocation)();
  } catch (e) {
    isRouterContextAvailable = false;
  }
  return (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
    children: (0, jsx_runtime_1.jsx)(HelpContext_1.HelpProvider, {
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "min-h-screen bg-background text-foreground font-sans",
        children: [
          (0, jsx_runtime_1.jsx)("header", {
            className:
              "border-b px-6 py-4 bg-white/10 sticky top-0 z-50 backdrop-blur",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "max-w-7xl mx-auto flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsx)("h1", {
                  className: "text-xl font-heading font-semibold",
                  children: "Allora OS",
                }),
                (0, jsx_runtime_1.jsx)("nav", {
                  className: "hidden md:block",
                  children: (0, jsx_runtime_1.jsxs)("ul", {
                    className: "flex items-center space-x-6",
                    children: [
                      (0, jsx_runtime_1.jsx)("li", {
                        children: (0, jsx_runtime_1.jsx)(
                          react_router_dom_2.Link,
                          {
                            to: "/dashboard",
                            className: "hover:text-primary transition-colors",
                            children: "Dashboard",
                          },
                        ),
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: (0, jsx_runtime_1.jsx)(
                          react_router_dom_2.Link,
                          {
                            to: "/strategies",
                            className: "hover:text-primary transition-colors",
                            children: "Strategies",
                          },
                        ),
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: (0, jsx_runtime_1.jsx)(
                          react_router_dom_2.Link,
                          {
                            to: "/settings",
                            className: "hover:text-primary transition-colors",
                            children: "Settings",
                          },
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)("main", {
            className: "max-w-7xl mx-auto p-6 space-y-8",
            children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
          }),
          (0, jsx_runtime_1.jsx)(toaster_1.Toaster, {}),
          (0, jsx_runtime_1.jsx)(AccessibilityPanel_1.AccessibilityButton, {}),
          (0, jsx_runtime_1.jsx)(HelpModal_1.HelpModal, {}),
          isRouterContextAvailable &&
            (0, jsx_runtime_1.jsx)(AccessibilityAnnouncer_1.default, {}),
        ],
      }),
    }),
  });
}
