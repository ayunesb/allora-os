
import { RouteObject } from "react-router-dom";

export const devRoutes: RouteObject[] = [
  {
    path: "/dev-admin-helper",
    async lazy() {
      const { default: DevAdminHelper } = await import("@/pages/dev/DevAdminHelper");
      return { element: <DevAdminHelper /> };
    }
  },
  {
    path: "/dev/debug",
    async lazy() {
      const { default: DevDebugPage } = await import("@/pages/dev/DevDebugPage");
      return { element: <DevDebugPage /> };
    }
  }
];
