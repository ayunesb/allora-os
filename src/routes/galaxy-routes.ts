import { RouteObject } from "react-router-dom";

export const galaxyRoutes: RouteObject[] = [
  {
    path: "galaxy",
    children: [
      {
        path: "plugins",
        children: [
          {
            path: "leaderboard",
            async lazy() {
              const { default: PluginLeaderboard } = await import(
                "@/pages/galaxy/plugins/leaderboard"
              );
              return { Component: PluginLeaderboard };
            },
          },
        ],
      },
    ],
  },
];
