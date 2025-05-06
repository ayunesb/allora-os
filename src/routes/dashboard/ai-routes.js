import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from "react";
const AiBoardroom = lazy(() => import("@/pages/dashboard/AiBoardroom"));
const AIAgent = lazy(() => import("@/pages/dashboard/AIAgent"));
const AISettings = lazy(() => import("@/pages/dashboard/AISettings"));
const ExecutiveLeaderboard = lazy(() => import("@/pages/dashboard/ExecutiveLeaderboard"));
const AIExecutiveDebate = lazy(() => import("@/pages/dashboard/AIExecutiveDebate"));
const Executives = lazy(() => import("@/pages/dashboard/Executives"));
const LangChainAgentAPI = lazy(() => import("@/pages/dashboard/LangChainAgentAPI"));
const AIChat = lazy(() => import("@/pages/dashboard/AIChat"));
const RedirectToDashboard = lazy(() => import("@/pages/dashboard/RedirectToDashboard"));
export const aiRoutes = [
    { path: "ai-boardroom", element: _jsx(AiBoardroom, {}) },
    { path: "ai-agent", element: _jsx(AIAgent, {}) },
    { path: "ai-settings", element: _jsx(AISettings, {}) },
    { path: "executive-leaderboard", element: _jsx(ExecutiveLeaderboard, {}) },
    { path: "debate", element: _jsx(AIExecutiveDebate, {}) },
    { path: "executives", element: _jsx(Executives, {}) },
    { path: "langchain-agent", element: _jsx(LangChainAgentAPI, {}) },
    { path: "ai-chat", element: _jsx(AIChat, {}) },
    { path: "ai-bots", element: _jsx(RedirectToDashboard, {}) },
];
