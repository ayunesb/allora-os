import { RouteObject } from "react-router-dom";

export const analyticsRoutes: RouteObject[] = [
  {
    path: "analytics",
    async lazy() {
      const { default: Analytics } = await import(
        "@/pages/dashboard/Analytics"
      );
      return { Component: Analytics };
    },
  },
  {
    path: "insights",
    async lazy() {
      const { default: InsightsDashboard } = await import(
        "@/pages/dashboard/insights"
      );
      return { Component: InsightsDashboard };
    },
  },
  {
    path: "insights/kpis",
    async lazy() {
      const { default: KPIMetricsPage } = await import("@/pages/insights/kpis");
      return { Component: KPIMetricsPage };
    },
  },
  {
    path: "forecast",
    async lazy() {
      const { default: Forecast } = await import("@/pages/dashboard/Forecast");
      return { Component: Forecast };
    },
  },
];
