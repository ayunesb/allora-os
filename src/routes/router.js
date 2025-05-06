"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var admin_routes_1 = require("./admin-routes");
var auth_routes_1 = require("./auth-routes");
var dashboard_routes_1 = require("./dashboard-routes");
var onboarding_routes_1 = require("./onboarding-routes");
var marketing_routes_1 = require("./marketing-routes");
var dev_routes_1 = require("./dev-routes");
var global_routes_1 = require("./global-routes");
var galaxy_routes_1 = require("./galaxy-routes");
var academy_routes_1 = require("./academy-routes");
var vault_routes_1 = require("./vault-routes");
var NavigationManager_1 = require("@/components/NavigationManager");
var NavigationTracker_1 = require("@/components/NavigationTracker");
var NavigationFixer_1 = require("@/components/navigation/NavigationFixer");
var HelpModal_1 = require("@/components/help/HelpModal");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var loggingService_1 = require("@/utils/loggingService");
var ComplianceContext_1 = require("@/context/ComplianceContext");
var react_router_dom_2 = require("react-router-dom");
// Lazy-loaded components
var RootLayout = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/components/layouts/RootLayout");
  });
});
var NotFound = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/NotFound");
  });
});
var Index = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/Index");
  });
});
var Home = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/Home");
  });
});
var Pricing = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/Pricing");
  });
});
var SystemDiagnostics = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/SystemDiagnostics");
  });
});
var Compliance = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/Compliance");
  });
});
var ComplianceRoutesWrapper = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("./ComplianceRoutesWrapper");
  });
});
var ShopAssistant = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/shop/index");
  });
});
var CampaignBuilder = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/campaigns/create");
  });
});
var PluginImpact = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/plugins/impact");
  });
});
// Loading fallback component
var LoadingFallback = function () {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex items-center justify-center min-h-screen",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col items-center space-y-4",
      children: [
        (0, jsx_runtime_1.jsx)("div", {
          className:
            "h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children: "Loading...",
        }),
      ],
    }),
  });
};
// Common suspense wrapper
var withSuspense = function (Component) {
  return (0, jsx_runtime_1.jsx)(react_1.Suspense, {
    fallback: (0, jsx_runtime_1.jsx)(LoadingFallback, {}),
    children: (0, jsx_runtime_1.jsx)(Component, {}),
  });
};
// Navigation layout with error boundary
var NavigationLayout = function () {
  loggingService_1.logger.info("NavigationLayout rendering");
  return (0, jsx_runtime_1.jsxs)(ErrorBoundary_1.ErrorBoundary, {
    children: [
      (0, jsx_runtime_1.jsx)(NavigationManager_1.NavigationManager, {}),
      (0, jsx_runtime_1.jsx)(NavigationTracker_1.NavigationTracker, {}),
      (0, jsx_runtime_1.jsx)(NavigationFixer_1.default, {}),
      (0, jsx_runtime_1.jsx)(HelpModal_1.HelpModal, {}),
      (0, jsx_runtime_1.jsx)(react_router_dom_2.Outlet, {}),
    ],
  });
};
// Wrap compliance routes with the ComplianceProvider
var ComplianceRoutes = function () {
  return (0, jsx_runtime_1.jsx)(ComplianceContext_1.ComplianceProvider, {
    children: (0, jsx_runtime_1.jsx)(react_router_dom_2.Outlet, {}),
  });
};
// Create dynamic routes with lazy loading
var createLazyRoutes = function () {
  // Root route must be added first
  var rootRoutes = [
    {
      path: "/",
      element: withSuspense(Index),
    },
  ];
  // Public routes
  var publicRoutes = [
    {
      path: "/home",
      element: withSuspense(Home),
    },
    {
      path: "/launch",
      element: withSuspense(function () {
        return Promise.resolve()
          .then(function () {
            return require("@/pages/launch");
          })
          .then(function (m) {
            return m.default;
          });
      }),
    },
    {
      path: "/diagnostics",
      element: withSuspense(SystemDiagnostics),
    },
    {
      path: "/pricing",
      element: withSuspense(Pricing),
    },
    {
      path: "/shop",
      element: withSuspense(ShopAssistant),
    },
    {
      path: "/campaigns/create",
      element: withSuspense(CampaignBuilder),
    },
    {
      path: "/plugins/impact",
      element: withSuspense(PluginImpact),
    },
    // Compliance routes inside a provider
    {
      path: "/compliance",
      element: (0, jsx_runtime_1.jsx)(ComplianceRoutes, {}),
      children: [
        {
          index: true,
          element: withSuspense(Compliance),
        },
        {
          path: "*",
          element: withSuspense(function () {
            return (0, jsx_runtime_1.jsx)(ComplianceRoutesWrapper, {});
          }),
        },
      ],
    },
    // Common redirects for legacy/mistyped URLs
    {
      path: "/calendar",
      element: (0, jsx_runtime_1.jsx)(react_router_dom_2.Navigate, {
        to: "/dashboard",
        replace: true,
      }),
    },
    {
      path: "/shop",
      element: (0, jsx_runtime_1.jsx)(react_router_dom_2.Navigate, {
        to: "/dashboard",
        replace: true,
      }),
    },
    {
      path: "/dashboard/account",
      element: (0, jsx_runtime_1.jsx)(react_router_dom_2.Navigate, {
        to: "/dashboard/profile",
        replace: true,
      }),
    },
    {
      path: "/dashboard/dashboard-settings",
      element: (0, jsx_runtime_1.jsx)(react_router_dom_2.Navigate, {
        to: "/dashboard/settings",
        replace: true,
      }),
    },
    {
      path: "/my-leads",
      element: (0, jsx_runtime_1.jsx)(react_router_dom_2.Navigate, {
        to: "/dashboard/leads",
        replace: true,
      }),
    },
  ];
  // Combine all routes - ensure rootRoutes are first
  var routes = __spreadArray(
    __spreadArray(
      __spreadArray(
        __spreadArray(
          __spreadArray(
            __spreadArray(
              __spreadArray(
                __spreadArray(
                  __spreadArray(
                    __spreadArray(
                      __spreadArray(
                        __spreadArray(
                          __spreadArray([], rootRoutes, true),
                          publicRoutes,
                          true,
                        ),
                        auth_routes_1.authRoutes,
                        true,
                      ),
                      admin_routes_1.adminRoutes,
                      true,
                    ),
                    dashboard_routes_1.dashboardRoutes,
                    true,
                  ),
                  onboarding_routes_1.onboardingRoutes,
                  true,
                ),
                marketing_routes_1.marketingRoutes,
                true,
              ),
              dev_routes_1.devRoutes,
              true,
            ),
            galaxy_routes_1.galaxyRoutes,
            true,
          ),
          academy_routes_1.academyRoutes,
          true,
        ),
        vault_routes_1.vaultRoutes,
        true,
      ),
      global_routes_1.globalRoutes.filter(function (route) {
        return route.path !== "*";
      }),
      true,
    ),
    [
      // The 404 catch-all route must be the very last one
      {
        path: "*",
        element: withSuspense(NotFound),
      },
    ],
    false,
  );
  return routes;
};
// Export the router configuration for use in App.tsx
exports.router = (0, react_router_dom_1.createBrowserRouter)([
  {
    element: (0, jsx_runtime_1.jsx)(react_1.Suspense, {
      fallback: (0, jsx_runtime_1.jsx)(LoadingFallback, {}),
      children: (0, jsx_runtime_1.jsx)(RootLayout, {}),
    }),
    errorElement: withSuspense(NotFound),
    children: [
      {
        element: (0, jsx_runtime_1.jsx)(NavigationLayout, {}),
        children: createLazyRoutes(),
      },
    ],
  },
]);
