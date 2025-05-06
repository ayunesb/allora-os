var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toast } from "sonner";
import { logComplianceChange } from "@/utils/auditLogger";
// Map of document IDs to their display names
export const documentIdToName = {
    "privacy-policy": "Privacy Policy",
    "terms-of-service": "Terms of Service",
    "data-processing": "Data Processing Agreement",
    "breach-notification": "Breach Notification Policy",
    cookies: "Cookie Policy",
    "acceptable-use": "Acceptable Use Policy",
    refund: "Refund and Cancellation Policy",
    disclaimer: "Disclaimer",
    copyright: "Copyright & IP Policy",
    security: "Security Policy",
    "ai-ethics": "AI Ethics and Fair Use Statement",
};
// This would typically connect to a backend API
export const checkForDocumentUpdates = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Checking for document updates from compliance service...");
    // In a real implementation, this would be an API call
    // Simulating an API response for demonstration
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                documentsNeedingUpdate: [
                    "terms-of-service",
                    "data-processing",
                    "privacy-policy",
                    "cookies",
                ],
                latestVersions: {
                    "privacy-policy": "v2.4",
                    "terms-of-service": "v2.0",
                    "data-processing": "v1.3",
                    "breach-notification": "v1.0",
                    cookies: "v1.1",
                    "acceptable-use": "v1.0",
                    refund: "v1.0",
                    disclaimer: "v1.0",
                    copyright: "v1.0",
                    security: "v1.1",
                    "ai-ethics": "v1.0",
                },
                regulatoryChanges: {
                    "terms-of-service": [
                        "GDPR Article 13 update",
                        "California Privacy Rights Act",
                    ],
                    "data-processing": ["EU SCCs update"],
                    "privacy-policy": ["California Consumer Privacy Act updates"],
                    cookies: ["ePrivacy Directive compliance update"],
                },
            });
        }, 1000);
    });
});
export const applyDocumentUpdate = (documentId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Applying update for document: ${documentId}`);
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Log the compliance change
            logComplianceChange("admin", // In a real app, this would be the actual user ID
            `Updated document: ${documentId} to latest version`, { documentId, updateType: "manual" });
            const documentName = documentIdToName[documentId] || documentId;
            toast.success(`${documentName} updated successfully`, {
                description: "The document has been updated to the latest version.",
            });
            resolve(true);
        }, 1500);
    });
});
export const setupAutomaticUpdates = (onUpdateAvailable) => {
    // Initial check
    checkForDocumentUpdates().then((result) => {
        if (result.documentsNeedingUpdate.length > 0) {
            onUpdateAvailable(result.documentsNeedingUpdate);
        }
    });
    // Set up periodic checks (every hour in this example)
    const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield checkForDocumentUpdates();
        if (result.documentsNeedingUpdate.length > 0) {
            onUpdateAvailable(result.documentsNeedingUpdate);
        }
    }), 3600000); // 1 hour
    // Return cleanup function
    return () => clearInterval(interval);
};
// New function to schedule regular compliance checks (every X days)
export const scheduleRegularComplianceCheck = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (intervalDays = 5, onUpdateAvailable) {
    console.log(`Scheduling regular compliance check every ${intervalDays} days`);
    // Calculate milliseconds based on days
    const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
    // Immediate first check
    try {
        const result = yield checkForDocumentUpdates();
        if (result.documentsNeedingUpdate.length > 0) {
            onUpdateAvailable(result.documentsNeedingUpdate);
            // Log that we found regulatory updates through automatic check
            logComplianceChange("system", `Scheduled compliance check found ${result.documentsNeedingUpdate.length} documents needing updates`, {
                documents: result.documentsNeedingUpdate,
                checkInterval: `${intervalDays} days`,
            });
        }
    }
    catch (error) {
        console.error("Error in initial compliance check:", error);
    }
    // Set up the interval for regular checks
    const intervalId = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`Running scheduled compliance check (every ${intervalDays} days)`);
            const result = yield checkForDocumentUpdates();
            if (result.documentsNeedingUpdate.length > 0) {
                onUpdateAvailable(result.documentsNeedingUpdate);
                // Log that we found regulatory updates through automatic check
                logComplianceChange("system", `Scheduled compliance check found ${result.documentsNeedingUpdate.length} documents needing updates`, {
                    documents: result.documentsNeedingUpdate,
                    checkInterval: `${intervalDays} days`,
                });
            }
        }
        catch (error) {
            console.error("Error in scheduled compliance check:", error);
        }
    }), intervalMs);
    // Store interval ID in localStorage to persist across sessions
    localStorage.setItem("complianceCheckInterval", String(intervalId));
    localStorage.setItem("complianceCheckIntervalDays", String(intervalDays));
    return Promise.resolve();
});
export const enableAutoUpdatesForDocument = (documentId, enabled) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Setting auto-update for ${documentId} to ${enabled}`);
    // This would be an API call in a real implementation
    return new Promise((resolve) => {
        setTimeout(() => {
            // Log the change
            logComplianceChange("admin", `${enabled ? "Enabled" : "Disabled"} auto-updates for document: ${documentId}`, { documentId, autoUpdate: enabled });
            toast.success(`Auto-updates ${enabled ? "enabled" : "disabled"}`, {
                description: `Document will ${enabled ? "now" : "no longer"} update automatically when new versions are available.`,
            });
            resolve(true);
        }, 500);
    });
});
// Track document versions and changes
export const getDocumentVersionHistory = (documentId) => __awaiter(void 0, void 0, void 0, function* () {
    // This would typically be an API call to fetch version history
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    version: "v2.3",
                    date: "2025-03-15",
                    changes: [
                        "Updated GDPR compliance sections",
                        "Added California compliance",
                    ],
                },
                {
                    version: "v2.2",
                    date: "2024-12-05",
                    changes: ["Fixed typographical errors"],
                },
                {
                    version: "v2.1",
                    date: "2024-09-20",
                    changes: ["Updated cookie policy"],
                },
                {
                    version: "v2.0",
                    date: "2024-06-10",
                    changes: ["Major revision", "Restructured all sections"],
                },
                { version: "v1.0", date: "2024-01-15", changes: ["Initial document"] },
            ]);
        }, 800);
    });
});
