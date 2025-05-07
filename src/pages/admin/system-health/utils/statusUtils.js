import React from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
/**
 * Returns the appropriate icon component for the given status
 */
export const getStatusIcon = (status) => {
    switch (status) {
        case "healthy":
            return React.createElement(CheckCircle, {
                className: "h-4 w-4 text-green-500",
            });
        case "degraded":
            return React.createElement(AlertTriangle, {
                className: "h-4 w-4 text-amber-500",
            });
        case "down":
            return React.createElement(XCircle, {
                className: "h-4 w-4 text-red-500",
            });
        default:
            return null;
    }
};
/**
 * Returns the appropriate CSS color class for the given status
 */
export const getStatusColorClass = (status) => {
    switch (status) {
        case "healthy":
            return "text-green-700 bg-green-50";
        case "degraded":
            return "text-amber-700 bg-amber-50";
        case "down":
            return "text-red-700 bg-red-50";
        default:
            return "";
    }
};
/**
 * Returns a descriptive text for the given status
 */
export const getStatusDescription = (status) => {
    switch (status) {
        case "healthy":
            return "System is operating normally";
        case "degraded":
            return "System is experiencing some issues but is still functional";
        case "down":
            return "System is currently unavailable";
        default:
            return "Unknown status";
    }
};
