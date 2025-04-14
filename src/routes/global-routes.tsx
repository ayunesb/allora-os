
import { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";

// Global routes that should be available everywhere
export const globalRoutes: RouteObject[] = [
  {
    path: "*",
    element: <NotFound />,
  }
];
