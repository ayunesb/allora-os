export const galaxyRoutes = [
    {
        path: "galaxy",
        children: [
            {
                path: "plugins",
                children: [
                    {
                        path: "leaderboard",
                        async lazy() {
                            const { default: PluginLeaderboard } = await import("@/pages/galaxy/plugins/leaderboard");
                            return { Component: PluginLeaderboard };
                        }
                    }
                ]
            }
        ]
    }
];
