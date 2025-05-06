import * as React from "react";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Route, Routes, Outlet } from "react-router-dom";
import withSuspense from "../utils/withSuspense";

const OnboardingPage = lazy(() => import("../pages/OnboardingPage"));
const OnboardingLayout = lazy(
  () => import("@/layouts/onboarding/OnboardingLayout"),
);
const OnboardingWelcome = lazy(
  () => import("@/pages/onboarding/OnboardingWelcome"),
);
const OnboardingProfile = lazy(
  () => import("@/pages/onboarding/OnboardingProfile"),
);
const OnboardingCompany = lazy(
  () => import("@/pages/onboarding/OnboardingCompany"),
);
const OnboardingTeam = lazy(() => import("@/pages/onboarding/OnboardingTeam"));
const OnboardingIntegrations = lazy(
  () => import("@/pages/onboarding/OnboardingIntegrations"),
);
const OnboardingAIWorkflow = lazy(
  () => import("@/pages/onboarding/OnboardingAIWorkflow"),
);
const OnboardingComplete = lazy(
  () => import("@/pages/onboarding/OnboardingComplete"),
);

export const onboardingRoutes: RouteObject[] = [
  {
    path: "onboarding",
    element: withSuspense(
      <OnboardingLayout>
        <Outlet />
      </OnboardingLayout>,
    ),
    children: [
      {
        index: true,
        element: withSuspense(<OnboardingWelcome />),
      },
      {
        path: "profile",
        element: withSuspense(<OnboardingProfile />),
      },
      {
        path: "company",
        element: withSuspense(<OnboardingCompany />),
      },
      {
        path: "team",
        element: withSuspense(<OnboardingTeam />),
      },
      {
        path: "integrations",
        element: withSuspense(<OnboardingIntegrations />),
      },
      {
        path: "ai-workflow",
        element: withSuspense(<OnboardingAIWorkflow />),
      },
      {
        path: "complete",
        element: withSuspense(<OnboardingComplete />),
      },
    ],
  },
];

export default function OnboardingRoutes() {
  return (
    <Routes>
      <Route path="/onboarding" element={withSuspense(<OnboardingPage />)} />
    </Routes>
  );
}
