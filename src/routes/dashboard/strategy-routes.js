export const strategyRoutes = [
    {
        path: "strategy-generator",
        async lazy() {
            const { default: StrategyGenerator } = await import("@/pages/dashboard/StrategyGenerator");
            return { Component: StrategyGenerator };
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
        path: "strategy/:id",
        async lazy() {
            const { default: StrategyDetails } = await import("@/pages/dashboard/StrategyDetails");
            return { Component: StrategyDetails };
        }
    }
];
