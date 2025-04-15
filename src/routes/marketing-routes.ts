
import { RouteObject } from "react-router-dom";

export const marketingRoutes: RouteObject[] = [
  {
    path: "/home",
    async lazy() {
      const { default: Home } = await import("@/pages/Home");
      return { element: <Home /> };
    }
  },
  {
    path: "/pricing",
    async lazy() {
      const { default: Pricing } = await import("@/pages/Pricing");
      return { element: <Pricing /> };
    }
  },
  {
    path: "/features",
    async lazy() {
      const { default: FeatureOverview } = await import("@/pages/FeatureOverview");
      return { element: <FeatureOverview /> };
    }
  }
];
