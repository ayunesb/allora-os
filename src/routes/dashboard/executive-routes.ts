import { RouteObject } from "react-router-dom";

export const executiveRoutes: RouteObject[] = [
  {
    path: "executives",
    async lazy() {
      const { default: Executives } = await import(
        "@/pages/dashboard/Executives"
      );
      return { Component: Executives };
    },
  },
  {
    path: "executive-agents",
    async lazy() {
      const { default: ExecutiveAgents } = await import(
        "@/pages/dashboard/ExecutiveAgents"
      );
      return { Component: ExecutiveAgents };
    },
  },
  {
    path: "decisions",
    async lazy() {
      const { default: ExecutiveDecisions } = await import(
        "@/pages/dashboard/ExecutiveDecisions"
      );
      return { Component: ExecutiveDecisions };
    },
  },
  {
    path: "risk-heatmap",
    async lazy() {
      const { default: RiskHeatmap } = await import(
        "@/pages/dashboard/RiskHeatmap"
      );
      return { Component: RiskHeatmap };
    },
  },
  {
    path: "leaderboard",
    async lazy() {
      const { default: ExecutiveLeaderboard } = await import(
        "@/pages/dashboard/ExecutiveLeaderboard"
      );
      return { Component: ExecutiveLeaderboard };
    },
  },
  {
    path: "executives/:name",
    async lazy() {
      const { default: ExecutiveProfile } = await import(
        "@/pages/dashboard/executives/[name]"
      );
      return { Component: ExecutiveProfile };
    },
  },
  {
    path: "executive-preferences",
    async lazy() {
      const { default: AISettings } = await import(
        "@/pages/dashboard/AISettings"
      );
      return { Component: AISettings };
    },
  },
];
