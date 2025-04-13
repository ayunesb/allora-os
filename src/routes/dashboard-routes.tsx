
import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Account from "@/pages/Account";
import Security from "@/pages/Security";
import Notifications from "@/pages/Notifications";
import Billing from "@/pages/Billing";
import AiBoardroom from "@/pages/AiBoardroom";
import AISettings from "@/pages/dashboard/AISettings";
import AIExecutiveDebate from "@/pages/dashboard/AIExecutiveDebate";
import AiBots from "@/components/ai-bots/AiBotsPage";
import AiExecutiveUpgrades from "@/pages/dashboard/AiExecutiveUpgrades";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/security",
    element: <Security />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/billing",
    element: <Billing />,
  },
  {
    path: "/ai-boardroom",
    element: <AiBoardroom />,
  },
  {
    path: "/dashboard/ai-settings",
    element: <AISettings />,
  },
  {
    path: "/dashboard/debate",
    element: <AIExecutiveDebate />,
  },
  {
    path: "/dashboard/ai-bots",
    element: <AiBots />,
  },
  {
    path: "/dashboard/ai-executive-upgrades",
    element: <AiExecutiveUpgrades />,
  },
];
