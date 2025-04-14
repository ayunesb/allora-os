
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { publicRoutes } from "@/routes/public-routes";
import { dashboardRoutes } from "@/routes/dashboard-routes";
import { globalRoutes } from "@/routes/global-routes";
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
        <AuthProvider>
          <ExecutiveWorkflowProvider>
            <Toaster richColors />
            <Routes>
              {/* Render each route using the map function to create Route components */}
              {publicRoutes.map((route) => (
                <Route 
                  key={route.path} 
                  path={route.path} 
                  element={route.element} 
                />
              ))}
              
              {/* Map through dashboard routes */}
              {dashboardRoutes.map((route) => {
                // Handle nested routes
                if (route.children) {
                  return (
                    <Route key={route.path} path={route.path} element={route.element}>
                      {route.children.map((childRoute) => (
                        <Route
                          key={childRoute.path || 'index'}
                          path={childRoute.path}
                          element={childRoute.element}
                          index={childRoute.index}
                        />
                      ))}
                    </Route>
                  );
                }
                
                // Handle regular routes
                return (
                  <Route 
                    key={route.path} 
                    path={route.path} 
                    element={route.element} 
                  />
                );
              })}
              
              {/* Map through global routes */}
              {globalRoutes.map((route) => (
                <Route 
                  key={route.path} 
                  path={route.path} 
                  element={route.element} 
                />
              ))}
            </Routes>
          </ExecutiveWorkflowProvider>
        </AuthProvider>
      </AuthRedirectProvider>
    </HelmetProvider>
  );
}

export default App;
