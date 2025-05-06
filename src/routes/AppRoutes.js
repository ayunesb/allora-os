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
exports.AppRoutes = AppRoutes;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var admin_routes_1 = require("./admin-routes");
var auth_routes_1 = require("./auth-routes");
var dashboard_routes_1 = require("./dashboard-routes");
var onboarding_routes_1 = require("./onboarding-routes");
var marketing_routes_1 = require("./marketing-routes");
var dev_routes_1 = require("./dev-routes");
var global_routes_1 = require("./global-routes");
var page_loader_1 = require("@/components/ui/page-loader");
function AppRoutes() {
  return (0, jsx_runtime_1.jsx)(react_1.Suspense, {
    fallback: (0, jsx_runtime_1.jsx)(page_loader_1.PageLoader, {}),
    children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, {
      children: [
        __spreadArray(
          __spreadArray(
            __spreadArray(
              __spreadArray(
                __spreadArray(
                  __spreadArray(
                    __spreadArray([], auth_routes_1.authRoutes, true),
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
          global_routes_1.globalRoutes,
          true,
        ).map(function (route) {
          return (0, jsx_runtime_1.jsx)(
            react_router_dom_1.Route,
            { path: route.path, element: route.element },
            route.path,
          );
        }),
        (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
          path: "*",
          element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
            to: "/not-found",
            replace: true,
          }),
        }),
      ],
    }),
  });
}
