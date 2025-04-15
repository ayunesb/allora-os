
import { RouteObject } from "react-router-dom";

export const integrationRoutes: RouteObject[] = [
  {
    path: "calendly",
    async lazy() {
      const { default: CalendlyIntegration } = await import("@/pages/admin/CalendlyIntegration");
      return { Component: CalendlyIntegration };
    }
  },
  {
    path: "plaid",
    async lazy() {
      const { default: PlaidIntegration } = await import("@/pages/admin/PlaidIntegration");
      return { Component: PlaidIntegration };
    }
  },
  {
    path: "calls",
    async lazy() {
      const { default: Calls } = await import("@/pages/dashboard/Calls");
      return { Component: Calls };
    }
  }
];
