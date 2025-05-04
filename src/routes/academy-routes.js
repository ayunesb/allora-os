export const academyRoutes = [
    {
        path: "academy",
        async lazy() {
            const { default: AcademyPage } = await import("@/pages/academy/index");
            return { Component: AcademyPage };
        }
    }
];
