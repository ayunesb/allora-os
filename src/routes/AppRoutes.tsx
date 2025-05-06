import React, { Suspense } from "react";
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
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Combine all routes */}
        {[
          ...authRoutes,
          ...adminRoutes,
          ...dashboardRoutes,
          ...onboardingRoutes,
          ...marketingRoutes,
          ...devRoutes,
          ...globalRoutes,
        ].map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
}
