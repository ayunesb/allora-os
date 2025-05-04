export const marketingRoutes = [
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
    }
];
