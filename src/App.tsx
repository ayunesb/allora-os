
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { publicRoutes } from "@/routes/public-routes";
import { dashboardRoutes } from "@/routes/dashboard-routes";
import { globalRoutes } from "@/routes/global-routes";
import { supabase } from "@/integrations/supabase/client";
import { AuthRedirectProvider } from "@/context/AuthRedirectContext";
import { ExecutiveWorkflowProvider } from "@/context/ExecutiveWorkflowContext";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Allora AI - Business Acceleration Platform</title>
        <meta name="description" content="AI-powered executive advisory platform designed to help businesses make strategic decisions and develop growth strategies" />
      </Helmet>
      
      <AuthRedirectProvider>
        <AuthProvider supabaseClient={supabase}>
          <ExecutiveWorkflowProvider>
            <Toaster richColors />
            <Routes>
              {publicRoutes}
              {dashboardRoutes}
              {globalRoutes}
            </Routes>
          </ExecutiveWorkflowProvider>
        </AuthProvider>
      </AuthRedirectProvider>
    </HelmetProvider>
  );
}

export default App;
