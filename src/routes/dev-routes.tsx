
import { RouteObject } from "react-router-dom";
import DevAdminHelper from "@/pages/DevAdminHelper";
import DevHelperRedirect from "@/pages/admin/DevHelperRedirect";

export const devRoutes: RouteObject[] = [
  {
    path: "/dev-admin-helper",
    element: <DevAdminHelper />,
  },
  {
    path: "/admin-check",
    element: <DevHelperRedirect />,
  }
];

export default devRoutes;
