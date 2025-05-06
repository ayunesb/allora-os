import React from "react";
export type ServiceStatus = "healthy" | "degraded" | "down";
/**
 * Returns the appropriate icon component for the given status
 */
export declare const getStatusIcon: (status: ServiceStatus) => React.ReactNode;
/**
 * Returns the appropriate CSS color class for the given status
 */
export declare const getStatusColorClass: (status: ServiceStatus) => string;
/**
 * Returns a descriptive text for the given status
 */
export declare const getStatusDescription: (status: ServiceStatus) => string;
