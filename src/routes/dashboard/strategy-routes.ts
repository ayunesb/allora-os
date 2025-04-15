
import { RouteObject } from "react-router-dom";

export const strategyRoutes: RouteObject[] = [
  {
    path: "strategies",
    async lazy() {
      const { default: Strategies } = await import("@/pages/dashboard/Strategies");
      return { Component: Strategies };
    }
  },
  {
    path: "strategy",
    async lazy() {
      const { Navigate } = await import("react-router-dom");
      return { 
        Component() {
          return <Navigate to="/dashboard/strategies" replace />;
        }
      };
    }
  },
  {
    path: "strategies/new",
    async lazy() {
      const { default: Debate } = await import("@/pages/dashboard/Debate");
      return { Component: Debate };
    }
  },
  {
    path: "strategies/:strategyId",
    async lazy() {
      const { default: Debate } = await import("@/pages/dashboard/Debate");
      return { Component: Debate };
    }
  },
  {
    path: "forecast",
    async lazy() {
      const { default: Forecast } = await import("@/pages/dashboard/Forecast");
      return { Component: Forecast };
    }
  },
  {
    path: "digital-twin",
    async lazy() {
      const { default: DigitalTwin } = await import("@/pages/dashboard/DigitalTwin");
      return { Component: DigitalTwin };
    }
  }
];
