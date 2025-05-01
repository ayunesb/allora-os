
import { RouteObject } from "react-router-dom";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    async lazy() {
      const { default: AdminLayout } = await import("@/layouts/AdminLayout");
      return { Component: AdminLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: AdminDashboard } = await import("@/pages/admin/AdminDashboard");
          return { Component: AdminDashboard };
        }
      },
      {
        path: "audit",
        async lazy() {
          const { default: AuditDashboard } = await import("@/pages/admin/AuditDashboard");
          return { Component: AuditDashboard };
        }
      },
      {
        path: "run-audit",
        async lazy() {
          const { default: RunAudit } = await import("@/pages/admin/RunAudit");
          return { Component: RunAudit };
        }
      },
      {
        path: "pre-launch-audit",
        async lazy() {
          const { default: PreLaunchAudit } = await import("@/pages/admin/PreLaunchAudit");
          return { Component: PreLaunchAudit };
        }
      },
      {
        path: "database-verification",
        async lazy() {
          const { default: DatabaseVerification } = await import("@/pages/admin/DatabaseVerification");
          return { Component: DatabaseVerification };
        }
      },
      {
        path: "launch-prep",
        async lazy() {
          const { default: LaunchPrep } = await import("@/pages/admin/LaunchPrep");
          return { Component: LaunchPrep };
        }
      },
      {
        path: "launch-verification",
        async lazy() {
          const { default: LaunchVerification } = await import("@/pages/admin/LaunchVerification");
          return { Component: LaunchVerification };
        }
      }
    ]
  }
];
