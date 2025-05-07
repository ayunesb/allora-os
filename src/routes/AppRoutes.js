import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { onboardingRoutes } from "./onboarding-routes";
import { marketingRoutes } from "./marketing-routes";
import { devRoutes } from "./dev-routes";
import { globalRoutes } from "./global-routes";
import { PageLoader } from "@/components/ui/page-loader";
export function AppRoutes() {
    return (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsxs(Routes, { children: [[
                    ...authRoutes,
                    ...adminRoutes,
                    ...dashboardRoutes,
                    ...onboardingRoutes,
                    ...marketingRoutes,
                    ...devRoutes,
                    ...globalRoutes,
                ].map((route) => (_jsx(Route, { path: route.path, element: route.element }, route.path))), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/not-found", replace: true }) })] }) }));
}
