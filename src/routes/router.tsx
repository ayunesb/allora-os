import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./admin-routes";
import { complianceRoutes } from "./compliance-routes";
import SystemDiagnostics from "@/pages/SystemDiagnostics";
import { publicRoutes } from "./public-routes";
import { authRoutes } from "./auth-routes";
import Dashboard from "@/pages/Dashboard";
import LegalDocument from "@/pages/LegalDocument";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import { AppRoutes } from ".";

// Export the router to use in main.tsx or App.tsx
export const router = createBrowserRouter([
  {
    path: "/diagnostics",
    element: <SystemDiagnostics />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/legal/:documentId",
    element: <LegalDocument />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  adminRoutes,
  ...complianceRoutes,
  ...publicRoutes,
  ...authRoutes,
]);
