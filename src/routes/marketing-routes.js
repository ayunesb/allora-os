export const marketingRoutes = [
    {
        path: "/home",
        async lazy() {
            const { default: Home } = await import("@/pages/Home");
            return { Component: Home };
        }
    },
    {
        path: "/pricing",
        async lazy() {
            const { default: Pricing } = await import("@/pages/Pricing");
            return { Component: Pricing };
        }
    },
    {
        path: "/features",
        async lazy() {
            const { default: FeatureOverview } = await import("@/pages/FeatureOverview");
            return { Component: FeatureOverview };
        }
    }
];
