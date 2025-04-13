
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RootLayout() {
  // Apply any global effects or settings when the root layout mounts
  React.useEffect(() => {
    document.documentElement.classList.add('antialiased');
    return () => {
      document.documentElement.classList.remove('antialiased');
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Outlet />
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}
