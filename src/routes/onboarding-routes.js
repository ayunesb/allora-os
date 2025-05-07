import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import withSuspense from "../utils/withSuspense";
const OnboardingPage = lazy(() => import("../pages/OnboardingPage"));
const OnboardingLayout = lazy(() => import("@/layouts/onboarding/OnboardingLayout"));
const OnboardingWelcome = lazy(() => import("@/pages/onboarding/OnboardingWelcome"));
const OnboardingProfile = lazy(() => import("@/pages/onboarding/OnboardingProfile"));
const OnboardingCompany = lazy(() => import("@/pages/onboarding/OnboardingCompany"));
const OnboardingTeam = lazy(() => import("@/pages/onboarding/OnboardingTeam"));
const OnboardingIntegrations = lazy(() => import("@/pages/onboarding/OnboardingIntegrations"));
const OnboardingAIWorkflow = lazy(() => import("@/pages/onboarding/OnboardingAIWorkflow"));
const OnboardingComplete = lazy(() => import("@/pages/onboarding/OnboardingComplete"));
export const onboardingRoutes = [
    {
        path: "onboarding",
        element: withSuspense(_jsx(OnboardingLayout, { children: _jsx(Outlet, {}) })),
        children: [
            {
                index: true,
                element: withSuspense(_jsx(OnboardingWelcome, {})),
            },
            {
                path: "profile",
                element: withSuspense(_jsx(OnboardingProfile, {})),
            },
            {
                path: "company",
                element: withSuspense(_jsx(OnboardingCompany, {})),
            },
            {
                path: "team",
                element: withSuspense(_jsx(OnboardingTeam, {})),
            },
            {
                path: "integrations",
                element: withSuspense(_jsx(OnboardingIntegrations, {})),
            },
            {
                path: "ai-workflow",
                element: withSuspense(_jsx(OnboardingAIWorkflow, {})),
            },
            {
                path: "complete",
                element: withSuspense(_jsx(OnboardingComplete, {})),
            },
        ],
    },
];
export default function OnboardingRoutes() {
    return (_jsx(Routes, { children: _jsx(Route, { path: "/onboarding", element: withSuspense(_jsx(OnboardingPage, {})) }) }));
}
