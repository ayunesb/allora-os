
import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { logger } from "@/utils/loggingService";

// Import components directly to avoid module resolution issues
import Index from "@/pages/admin/Index";

// Define the routes
const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <Index />,
  }
];

// Export the routes array directly
export { adminRoutes };
export default adminRoutes;
