
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout() {
  // Apply any global effects or settings when the root layout mounts
  useEffect(() => {
    document.documentElement.classList.add('antialiased');
    return () => {
      document.documentElement.classList.remove('antialiased');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Outlet />
      <Toaster />
    </div>
  );
}
