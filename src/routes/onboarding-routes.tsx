
import { RouteObject } from "react-router-dom";
import Onboarding from "@/pages/Onboarding";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

export const onboardingRoutes: RouteObject[] = [
  {
    path: "/onboarding",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
];
