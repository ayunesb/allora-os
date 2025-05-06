import { RouteObject } from "react-router-dom";
import type { User } from '@/types/user';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const onboardingRoutes: RouteObject[] = [
  {
    path: "onboarding",
    async lazy() {
      const OnboardingLayout = (await import('@/layouts/OnboardingLayout')).default;
      return {
        Component: OnboardingLayout,
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: OnboardingWelcome } = await import("@/pages/onboarding/OnboardingWelcome");
          return { Component: OnboardingWelcome };
        },
      },
      {
        path: "profile",
        async lazy() {
          const { default: OnboardingProfile } = await import("@/pages/onboarding/OnboardingProfile");
          return { Component: OnboardingProfile };
        },
      },
      {
        path: "company",
        async lazy() {
          const { default: OnboardingCompany } = await import("@/pages/onboarding/OnboardingCompany");
          return { Component: OnboardingCompany };
        },
      },
      {
        path: "team",
        async lazy() {
          const { default: OnboardingTeam } = await import("@/pages/onboarding/OnboardingTeam");
          return { Component: OnboardingTeam };
        },
      },
      {
        path: "integrations",
        async lazy() {
          const { default: OnboardingIntegrations } = await import("@/pages/onboarding/OnboardingIntegrations");
          return { Component: OnboardingIntegrations };
        },
      },
      {
        path: "ai-workflow",
        async lazy() {
          const { default: OnboardingAIWorkflow } = await import("@/pages/onboarding/OnboardingAIWorkflow");
          return { Component: OnboardingAIWorkflow };
        },
      },
      {
        path: "complete",
        async lazy() {
          const { default: OnboardingComplete } = await import("@/pages/onboarding/OnboardingComplete");
          return { Component: OnboardingComplete };
        },
      },
    ],
  },
];

export default onboardingRoutes;