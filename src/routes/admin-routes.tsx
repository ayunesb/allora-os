
import { RouteObject } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import AdminRoute from "@/components/AdminRoute";
import LaunchPlan from "@/pages/admin/LaunchPlan";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <LaunchPlan />,
      },
      {
        path: "launch-plan",
        element: <LaunchPlan />,
      },
    ],
  },
];
