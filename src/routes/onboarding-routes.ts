
import { RouteObject } from "react-router-dom";

export const onboardingRoutes: RouteObject[] = [
  {
    path: "/onboarding",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Onboarding } = await import("@/pages/Onboarding");
      return { element: <ProtectedRoute><Onboarding /></ProtectedRoute> };
    }
  }
];
