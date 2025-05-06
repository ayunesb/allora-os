import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useCompliance } from "@/hooks/useCompliance";
/**
 * This is a redirector component that handles any compliance-related setup
 * before redirecting to the main compliance dashboard
 */
export default function Compliance() {
    const compliance = useCompliance();
    const location = useLocation();
    useEffect(() => {
        // Schedule regular compliance check if available
        if (compliance.scheduleComplianceCheck) {
            compliance.scheduleComplianceCheck().catch((error) => {
                console.error("Failed to schedule compliance check:", error);
            });
        }
        // Show notification if there are pending updates
        if (compliance.pendingUpdates && compliance.pendingUpdates.length > 0) {
            toast.info(`Updates available for ${compliance.pendingUpdates.length} document(s)`, {
                description: "New regulatory updates are available for some compliance documents.",
                action: {
                    label: "Review",
                    onClick: () => (window.location.href = "/compliance/reports"),
                },
            });
        }
    }, [compliance]);
    // Check if we're already on a compliance sub-path to prevent redirect loops
    const isAlreadyOnCompliancePath = location.pathname.startsWith("/compliance/");
    // Only redirect if we're not already on a compliance sub-path
    if (!isAlreadyOnCompliancePath) {
        return _jsx(Navigate, { to: "/compliance/overview", replace: true });
    }
    // If already on a compliance path, render nothing (this component should never
    // actually render anything as it's just a redirector)
    return null;
}
