
import { RouteObject } from "react-router-dom";
import Onboarding from "@/pages/Onboarding";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

export const onboardingRoutes: RouteObject[] = [
  {
    path: "onboarding",
    element: (
      <ProtectedRoute>
        <OnboardingLayout>
          <Onboarding />
        </OnboardingLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "company-info",
        element: <Onboarding />
      },
      {
        path: "industry",
        element: <Onboarding />
      },
      {
        path: "goals",
        element: <Onboarding />
      },
      {
        path: "risk-profile",
        element: <Onboarding />
      },
      {
        path: "brand-identity",
        element: <Onboarding />
      },
      {
        path: "executive-team",
        element: <Onboarding />
      },
      {
        path: "communication-preferences",
        element: <Onboarding />
      },
      {
        path: "crm-integrations",
        element: <Onboarding />
      },
      {
        path: "company-details",
        element: <Onboarding />
      }
    ]
  },
  {
    path: "onboarding/*",
    element: (
      <ProtectedRoute>
        <NotFound />
      </ProtectedRoute>
    ),
  }
];
