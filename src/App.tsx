
import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { HelpProvider } from "./context/HelpContext";
import { Toaster as SonnerToaster } from "sonner";
import "./App.css";

function App() {
  return (
    <HelpProvider>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
          <SonnerToaster position="top-right" />
          <Toaster />
        </Suspense>
      </AuthProvider>
    </HelpProvider>
  );
}

export default App;
