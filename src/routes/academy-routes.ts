import { RouteObject } from "react-router-dom";

export const academyRoutes: RouteObject[] = [
  {
    path: "academy",
    async lazy() {
      const { default: AcademyPage } = await import("@/pages/academy/index");
      return { Component: AcademyPage };
    },
  },
];
