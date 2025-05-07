import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerNavigate } from "@/utils/navigation";
import { logger } from "@/utils/loggingService";
export const NavigationManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        try {
            // Register the navigate function for use outside of React components
            logger.info(`NavigationManager: Registering navigation function for route: ${location.pathname}`);
            registerNavigate(navigate);
            // Clean up when component unmounts
            return () => {
                logger.info("NavigationManager: Unregistering navigation function");
                registerNavigate(() => {
                    console.warn("Navigation attempted after component unmounted");
                });
            };
        }
        catch (error) {
            logger.error("Error in NavigationManager useEffect:", error);
        }
    }, [navigate]);
    // Log current route for debugging
    useEffect(() => {
        try {
            logger.info(`NavigationManager: Current route changed to: ${location.pathname}`);
            console.log("Current route path:", location.pathname);
        }
        catch (error) {
            logger.error("Error logging current route:", error);
        }
    }, [location]);
    // This component doesn't render anything
    return null;
};
