import { RouteObject } from "react-router-dom";

export const vaultRoutes: RouteObject[] = [
  {
    path: "vault",
    children: [
      {
        path: "templates",
        async lazy() {
          const { default: VaultTemplatesPage } = await import(
            "@/pages/vault/templates/index"
          );
          return { Component: VaultTemplatesPage };
        },
      },
    ],
  },
];
