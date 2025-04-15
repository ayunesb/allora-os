
import { RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    async lazy() {
      const { default: DashboardLayout } = await import("@/components/DashboardLayout");
      return { Component: DashboardLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: Dashboard } = await import("@/pages/dashboard/Dashboard");
          return { Component: Dashboard };
        }
      },
      {
        path: "leads",
        async lazy() {
          const { default: Leads } = await import("@/pages/dashboard/Leads");
          return { Component: Leads };
        }
      },
      {
        path: "leads/:leadId",
        async lazy() {
          const { default: Leads } = await import("@/pages/dashboard/Leads");
          return { Component: Leads };
        }
      },
      {
        path: "campaigns",
        async lazy() {
          const { default: Campaigns } = await import("@/pages/dashboard/Campaigns");
          return { Component: Campaigns };
        }
      },
      {
        path: "campaigns/new",
        async lazy() {
          const { default: CampaignCreate } = await import("@/pages/dashboard/CampaignCreate");
          return { Component: CampaignCreate };
        }
      },
      {
        path: "campaigns/:campaignId",
        async lazy() {
          const { default: CampaignDetail } = await import("@/pages/dashboard/CampaignDetail");
          return { Component: CampaignDetail };
        }
      },
      {
        path: "campaigns/payment-success",
        async lazy() {
          const { default: CampaignPaymentSuccess } = await import("@/pages/dashboard/CampaignPaymentSuccess");
          return { Component: CampaignPaymentSuccess };
        }
      },
      {
        path: "analytics",
        async lazy() {
          const { default: Analytics } = await import("@/pages/dashboard/Analytics");
          return { Component: Analytics };
        }
      },
      {
        path: "strategies",
        async lazy() {
          const { default: Strategies } = await import("@/pages/dashboard/Strategies");
          return { Component: Strategies };
        }
      },
      {
        path: "strategy",
        async lazy() {
          const { Navigate } = await import("react-router-dom");
          return { 
            Component() {
              return <Navigate to="/dashboard/strategies" replace />;
            }
          };
        }
      },
      {
        path: "strategies/new",
        async lazy() {
          const { default: Debate } = await import("@/pages/dashboard/Debate");
          return { Component: Debate };
        }
      },
      {
        path: "strategies/:strategyId",
        async lazy() {
          const { default: Debate } = await import("@/pages/dashboard/Debate");
          return { Component: Debate };
        }
      },
      {
        path: "calls",
        async lazy() {
          const { default: Calls } = await import("@/pages/dashboard/Calls");
          return { Component: Calls };
        }
      },
      {
        path: "executives",
        async lazy() {
          const { default: Executives } = await import("@/pages/dashboard/Executives");
          return { Component: Executives };
        }
      },
      {
        path: "executive-agents",
        async lazy() {
          const { default: ExecutiveAgents } = await import("@/pages/dashboard/ExecutiveAgents");
          return { Component: ExecutiveAgents };
        }
      },
      {
        path: "decisions",
        async lazy() {
          const { default: ExecutiveDecisions } = await import("@/pages/dashboard/ExecutiveDecisions");
          return { Component: ExecutiveDecisions };
        }
      },
      {
        path: "risk-heatmap",
        async lazy() {
          const { default: RiskHeatmap } = await import("@/pages/dashboard/RiskHeatmap");
          return { Component: RiskHeatmap };
        }
      },
      {
        path: "leaderboard",
        async lazy() {
          const { default: ExecutiveLeaderboard } = await import("@/pages/dashboard/ExecutiveLeaderboard");
          return { Component: ExecutiveLeaderboard };
        }
      },
      {
        path: "forecast",
        async lazy() {
          const { default: Forecast } = await import("@/pages/dashboard/Forecast");
          return { Component: Forecast };
        }
      },
      {
        path: "digital-twin",
        async lazy() {
          const { default: DigitalTwin } = await import("@/pages/dashboard/DigitalTwin");
          return { Component: DigitalTwin };
        }
      },
      {
        path: "executive-preferences",
        async lazy() {
          const { default: AISettings } = await import("@/pages/dashboard/AISettings");
          return { Component: AISettings };
        }
      },
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
        path: "calendly",
        async lazy() {
          const { default: CalendlyIntegration } = await import("@/pages/admin/CalendlyIntegration");
          return { Component: CalendlyIntegration };
        }
      },
      {
        path: "plaid",
        async lazy() {
          const { default: PlaidIntegration } = await import("@/pages/admin/PlaidIntegration");
          return { Component: PlaidIntegration };
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
      },
      {
        path: "settings",
        async lazy() {
          const { default: Settings } = await import("@/pages/dashboard/Settings");
          return { Component: Settings };
        }
      },
      {
        path: "profile",
        async lazy() {
          const { default: Profile } = await import("@/pages/dashboard/Profile");
          return { Component: Profile };
        }
      },
      {
        path: "company-setup",
        async lazy() {
          const { default: CompanySetup } = await import("@/pages/DevAdminHelper");
          return { Component: CompanySetup };
        }
      },
      {
        path: "billing",
        async lazy() {
          const { default: Billing } = await import("@/pages/Billing");
          return { Component: Billing };
        }
      },
      {
        path: "executives/:name",
        async lazy() {
          const { default: ExecutiveProfile } = await import("@/pages/dashboard/executives/[name]");
          return { Component: ExecutiveProfile };
        }
      },
      {
        path: "*",
        async lazy() {
          const { default: NotFound } = await import("@/pages/NotFound");
          return { Component: NotFound };
        }
      }
    ]
  }
];
