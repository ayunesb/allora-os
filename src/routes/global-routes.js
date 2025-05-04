export const globalRoutes = [
    {
        path: "/404",
        async lazy() {
            const { default: NotFound } = await import("@/pages/NotFound");
            return { Component: NotFound };
        }
    },
    {
        path: "/legal",
        async lazy() {
            const { default: Legal } = await import("@/pages/Legal");
            return { Component: Legal };
        }
    },
    {
        path: "/faq",
        async lazy() {
            const { default: FAQ } = await import("@/pages/FAQ");
            return { Component: FAQ };
        }
    },
    {
        path: "/privacy",
        async lazy() {
            const { default: Privacy } = await import("@/pages/Privacy");
            return { Component: Privacy };
        }
    },
    {
        path: "/terms",
        async lazy() {
            const { default: TermsOfService } = await import("@/pages/TermsOfService");
            return { Component: TermsOfService };
        }
    },
    {
        path: "/contact",
        async lazy() {
            const { default: Contact } = await import("@/pages/Contact");
            return { Component: Contact };
        }
    },
    {
        path: "/security",
        async lazy() {
            const { default: Security } = await import("@/pages/Security");
            return { Component: Security };
        }
    }
];
