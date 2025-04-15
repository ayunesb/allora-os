
import { RouteObject } from "react-router-dom";

export const analyticsRoutes: RouteObject[] = [
  {
    path: "analytics",
    async lazy() {
      const { default: Analytics } = await import("@/pages/dashboard/Analytics");
      return { Component: Analytics };
    }
  }
];
