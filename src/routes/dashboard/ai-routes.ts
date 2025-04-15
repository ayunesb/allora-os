
import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

// Lazy load the components
const AIBots = lazy(() => import('@/pages/dashboard/AIBots'));
const AiBoardroom = lazy(() => import('@/pages/dashboard/AiBoardroom'));
const AIAgent = lazy(() => import('@/pages/dashboard/AIAgent'));
const AISettings = lazy(() => import('@/pages/dashboard/AISettings'));
const ExecutiveLeaderboard = lazy(() => import('@/pages/dashboard/ExecutiveLeaderboard'));
const AIExecutiveDebate = lazy(() => import('@/pages/dashboard/AIExecutiveDebate'));
const Executives = lazy(() => import('@/pages/dashboard/Executives'));
const LangChainAgentAPI = lazy(() => import('@/pages/dashboard/LangChainAgentAPI'));
const AIChat = lazy(() => import('@/pages/dashboard/AIChat'));

export const aiRoutes: RouteObject[] = [
  {
    path: 'ai-bots',
    element: <AIBots />
  },
  {
    path: 'ai-boardroom',
    element: <AiBoardroom />
  },
  {
    path: 'ai-agent',
    element: <AIAgent />
  },
  {
    path: 'ai-settings',
    element: <AISettings />
  },
  {
    path: 'executive-leaderboard',
    element: <ExecutiveLeaderboard />
  },
  {
    path: 'debate',
    element: <AIExecutiveDebate />
  },
  {
    path: 'executives',
    element: <Executives />
  },
  {
    path: 'langchain-agent',
    element: <LangChainAgentAPI />
  },
  {
    path: 'ai-chat',
    element: <AIChat />
  }
];
