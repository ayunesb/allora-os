
import { RouteObject } from "react-router-dom";

export const aiRoutes: RouteObject[] = [
  {
    path: "ai-bots",
    async lazy() {
      const { default: AiBots } = await import("@/pages/dashboard/AiBots");
      return { Component: AiBots };
    }
  },
  {
    path: "ai-bots/:botId",
    async lazy() {
      const { default: BotDetail } = await import("@/pages/dashboard/BotDetail");
      return { Component: BotDetail };
    }
  },
  {
    path: "debate",
    async lazy() {
      const { default: Debate } = await import("@/pages/dashboard/Debate");
      return { Component: Debate };
    }
  },
  {
    path: "ai-chat",
    async lazy() {
      const { default: AIChat } = await import("@/pages/dashboard/AIChat");
      return { Component: AIChat };
    }
  },
  {
    path: "ai-agent",
    async lazy() {
      const { default: AIAgent } = await import("@/pages/dashboard/AIAgent");
      return { Component: AIAgent };
    }
  },
  {
    path: "ai-settings",
    async lazy() {
      const { default: AISettings } = await import("@/pages/dashboard/AISettings");
      return { Component: AISettings };
    }
  },
  {
    path: "ai-workflow",
    async lazy() {
      const { default: OnboardingWorkflow } = await import("@/pages/dashboard/OnboardingWorkflow");
      return { Component: OnboardingWorkflow };
    }
  }
];
