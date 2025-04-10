
import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { devRoutes } from "./dev-routes";

export const router = createBrowserRouter([
  ...publicRoutes,
  dashboardRoutes,
  adminRoutes,
  ...authRoutes,
  ...devRoutes,
]);
