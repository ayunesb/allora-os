import { RouteObject } from "react-router-dom";
import withSuspense from "@/utils/withSuspense"; // Assuming this utility exists

export const onboardingRoutes: RouteObject[] = [
  {
    path: "onboarding",
    async lazy() {
      try {
        const { default: OnboardingLayout } = await import(
          "@/layouts/OnboardingLayout"
        );
        return { element: withSuspense(<OnboardingLayout />) };
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unknown error");
        throw error;
      }
    },
    children: [
      {
        index: true,
        async lazy() {
          try {
            const { default: OnboardingWelcome } = await import(
              "@/pages/onboarding/OnboardingWelcome"
            );
            return { element: withSuspense(<OnboardingWelcome />) };
          } catch (error) {
            console.error(
              error instanceof Error ? error.message : "Unknown error",
            );
            throw error;
          }
        },
      },
      {
        path: "profile",
        async lazy() {
          try {
            const { default: OnboardingProfile } = await import(
              "@/pages/onboarding/OnboardingProfile"
            );
            return { element: withSuspense(<OnboardingProfile />) };
          } catch (error) {
            console.error(
              error instanceof Error ? error.message : "Unknown error",
            );
            throw error;
          }
        },
      },
      {
        path: "company",
        async lazy() {
          try {
            const { default: OnboardingCompany } = await import(
              "@/pages/onboarding/OnboardingCompany"
            );
            return { element: withSuspense(<OnboardingCompany />) };
          } catch (error) {
            console.error(
              error instanceof Error ? error.message : "Unknown error",
            );
            throw error;
          }
        },
      },
      {
        path: "team",
        async lazy() {
          try {
            const { default: OnboardingTeam } = await import(
              "@/pages/onboarding/OnboardingTeam"
            );
            return { element: withSuspense(<OnboardingTeam />) };
          } catch (error) {
            console.error(
              error instanceof Error ? error.message : "Unknown error",
            );
            throw error;
          }
        },
      },
      {
        path: "integrations",
        async lazy() {
          try {
            const { default: OnboardingIntegrations } = await import(
              "@/pages/onboarding/OnboardingIntegrations"
            );
            return { element: withSuspense(<OnboardingIntegrations />) };
          } catch (error) {
            console.error(
              error instanceof Error ? error.message : "Unknown error",
            );
            throw error;
          }
        },
      },
      {
        path: "ai-workflow",
        async lazy() {
          try {
            const { default: OnboardingAIWorkflow } = await import(
              "@/pages/onboarding/OnboardingAIWorkflow"
            );
            return { element: withSuspense(<OnboardingAIWorkflow />) };
          } catch (error) {
            console.error(
              error instanceof Error ? error.message : "Unknown error",
            );
            throw error;
          }
        },
      },
      {
        path: "complete",
        async lazy() {
          try {
            const { default: OnboardingComplete } = await import(
              "@/pages/onboarding/OnboardingComplete"
            );
            return { element: withSuspense(<OnboardingComplete />) };
          } catch (error) {
            console.error(
              error instanceof Error ? error.message : "Unknown error",
            );
            throw error;
          }
        },
      },
    ],
  },
];

export default onboardingRoutes;
