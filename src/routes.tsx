
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import { Toaster } from "@/components/ui/sonner";

export function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
