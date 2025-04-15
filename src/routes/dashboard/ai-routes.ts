
import { RouteObject } from "react-router-dom";

export const aiRoutes: RouteObject[] = [
  {
    path: "ai-bots",
    async lazy() {
      const { default: AIBots } = await import("@/pages/dashboard/AIBots");
      return { Component: AIBots };
    }
  },
  {
    path: "ai-boardroom",
    async lazy() {
      const { default: AIBoardroom } = await import("@/pages/dashboard/AIBoardroom");
      return { Component: AIBoardroom };
    }
  },
  {
    path: "ai-executive-debate",
    async lazy() {
      const { default: AIExecutiveDebate } = await import("@/pages/dashboard/AIExecutiveDebate");
      return { Component: AIExecutiveDebate };
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
    path: "ai-chat",
    async lazy() {
      const { default: AIChat } = await import("@/pages/dashboard/AIChat");
      return { Component: AIChat };
    }
  },
  {
    path: "langchain-agent-api",
    async lazy() {
      const { default: LangChainAgentAPI } = await import("@/pages/dashboard/LangChainAgentAPI");
      return { Component: LangChainAgentAPI };
    }
  },
  {
    path: "executive-actions",
    async lazy() {
      const { default: ExecutiveActions } = await import("@/pages/dashboard/ExecutiveActions");
      return { Component: AIBoardroom };
    }
  }
];
