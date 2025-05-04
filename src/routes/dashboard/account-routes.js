export const accountRoutes = [
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
    }
];
