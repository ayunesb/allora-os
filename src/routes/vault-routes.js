export const vaultRoutes = [
    {
        path: "vault",
        children: [
            {
                path: "templates",
                async lazy() {
                    const { default: VaultTemplatesPage } = await import("@/pages/vault/templates/index");
                    return { Component: VaultTemplatesPage };
                }
            }
        ]
    }
];
