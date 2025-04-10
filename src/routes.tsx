
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";

export function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
      <AuthProvider>
        <Toaster />
      </AuthProvider>
    </>
  );
}
