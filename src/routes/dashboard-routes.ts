import { RouteObject } from "react-router-dom";
import { executiveRoutes } from "./dashboard/executive-routes";
import { aiRoutes } from "./dashboard/ai-routes";
import { marketingRoutes } from "./dashboard/marketing-routes";
import { strategyRoutes } from "./dashboard/strategy-routes";
import { integrationRoutes } from "./dashboard/integration-routes";
import { accountRoutes } from "./dashboard/account-routes";
import { analyticsRoutes } from "./dashboard/analytics-routes";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    async lazy() {
      const { default: DashboardLayout } = await import(
        "@/components/DashboardLayout"
      );
      return { Component: DashboardLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: Dashboard } = await import(
            "@/pages/dashboard/Dashboard"
          );
          return { Component: Dashboard };
        },
      },
      // Include all modular route sections
      ...marketingRoutes,
      ...analyticsRoutes,
      ...strategyRoutes,
      ...integrationRoutes,
      ...executiveRoutes,
      ...aiRoutes,
      ...accountRoutes,
      // 404 route must be the last one
      {
        path: "*",
        async lazy() {
          const { default: NotFound } = await import("@/pages/NotFound");
          return { Component: NotFound };
        },
      },
    ],
  },
];
