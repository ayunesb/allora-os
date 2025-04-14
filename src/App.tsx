
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { AuthRedirectProvider } from "@/context/AuthRedirectContext";
import { ExecutiveWorkflowProvider } from "@/context/ExecutiveWorkflowContext";
import { router } from "@/routes/router";
import { GlobalErrorModal } from "@/components/errorHandling/GlobalErrorModal";
import { setupErrorLogging } from "@/utils/errorHandling/errorLogging";

// Set up error logging
setupErrorLogging();

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Allora AI - Business Acceleration Platform</title>
        <meta name="description" content="AI-powered executive advisory platform designed to help businesses make strategic decisions and develop growth strategies" />
      </Helmet>
      
      <AuthRedirectProvider>
        <AuthProvider>
          <ExecutiveWorkflowProvider>
            <RouterProvider router={router} />
            <Toaster richColors />
            <GlobalErrorModal />
          </ExecutiveWorkflowProvider>
        </AuthProvider>
      </AuthRedirectProvider>
    </HelmetProvider>
  );
}

export default App;
