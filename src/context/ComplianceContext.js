var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
// Create context with default values
export const ComplianceContext = createContext({
    // Core properties
    isLoaded: false,
    error: null,
    // Auto-update functionality
    checkForUpdates: () => { },
    setAutoUpdate: () => { },
    isCheckingUpdates: false,
    lastChecked: null,
    autoUpdate: false,
    updatePreference: () => { },
    // Pending updates management
    pendingUpdates: [],
    isApplyingUpdate: false,
    applyUpdate: () => __awaiter(void 0, void 0, void 0, function* () { }),
    applyAllUpdates: () => __awaiter(void 0, void 0, void 0, function* () { }),
    scheduleComplianceCheck: () => __awaiter(void 0, void 0, void 0, function* () { }),
    enableAutoUpdates: () => __awaiter(void 0, void 0, void 0, function* () { return false; }),
    // Mode toggles and settings
    isCompliantMode: false,
    toggleCompliantMode: () => { },
    hasAcknowledgedTerms: false,
    acknowledgeTerms: () => { },
    // Data retention settings
    privacyLevel: "standard",
    setPrivacyLevel: () => { },
    dataRetentionDays: 90,
    setDataRetentionDays: () => { },
    // Document management
    loadCompliance: () => { },
    saveCompliance: () => { },
    resetCompliance: () => { },
});
export const ComplianceProvider = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
    const [lastChecked, setLastChecked] = useState(null);
    const [pendingUpdates, setPendingUpdates] = useState([]);
    const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);
    const [autoUpdate, setAutoUpdateState] = useState(false);
    // Mode toggles and settings
    const [isCompliantMode, setIsCompliantMode] = useState(false);
    const [hasAcknowledgedTerms, setHasAcknowledgedTerms] = useState(false);
    const [privacyLevel, setPrivacyLevel] = useState("standard");
    const [dataRetentionDays, setDataRetentionDays] = useState(90);
    // Check for updates
    const checkForUpdates = () => {
        setIsCheckingUpdates(true);
        // Simulate API call
        setTimeout(() => {
            setLastChecked(new Date().toISOString());
            setPendingUpdates(["gdpr-update", "ccpa-update"]);
            setIsCheckingUpdates(false);
            toast.info("Compliance updates found");
        }, 1500);
    };
    // Set auto-update preference
    const setAutoUpdate = (value) => {
        setAutoUpdateState(value);
        // Simulate API call
        toast.success(value ? "Auto-updates enabled" : "Auto-updates disabled");
    };
    // Apply a specific update
    const applyUpdate = (documentId) => __awaiter(void 0, void 0, void 0, function* () {
        setIsApplyingUpdate(true);
        try {
            // Simulate API call
            yield new Promise((resolve) => setTimeout(resolve, 2000));
            // Remove from pending updates
            setPendingUpdates(pendingUpdates.filter((id) => id !== documentId));
            toast.success(`Update ${documentId} applied successfully`);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError(errorMessage);
            toast.error(`Failed to apply update ${documentId}`);
        }
        finally {
            setIsApplyingUpdate(false);
        }
    });
    // Apply all updates
    const applyAllUpdates = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsApplyingUpdate(true);
        try {
            // Simulate API call
            yield new Promise((resolve) => setTimeout(resolve, 3000));
            // Clear pending updates
            setPendingUpdates([]);
            toast.success("All updates applied successfully");
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError(errorMessage);
            toast.error("Failed to apply updates");
        }
        finally {
            setIsApplyingUpdate(false);
        }
    });
    // Schedule compliance check
    const scheduleComplianceCheck = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (intervalDays = 30) {
        try {
            // Simulate API call
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success(`Compliance check scheduled every ${intervalDays} days`);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError(errorMessage);
            toast.error("Failed to schedule compliance check");
        }
    });
    // Enable auto-updates for a document
    const enableAutoUpdates = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Simulate API call
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Auto-updates enabled");
            return true;
        }
        catch (err) {
            toast.error(`Failed to enable auto-updates: ${err instanceof Error ? err.message : "Unknown error"}`);
            return false;
        }
    });
    // Update preference wrapper - ensures type safety for privacy level
    const updatePreference = (key, value) => {
        if (key === "autoUpdate") {
            setAutoUpdate(value);
        }
        else if (key === "privacyLevel") {
            // Ensure privacy level is one of the allowed values
            if (value === "standard" || value === "strict" || value === "custom") {
                setPrivacyLevel(value);
            }
        }
    };
    // Toggle compliant mode
    const toggleCompliantMode = () => {
        setIsCompliantMode((prev) => !prev);
    };
    // Acknowledge terms
    const acknowledgeTerms = () => {
        setHasAcknowledgedTerms(true);
    };
    // Load compliance data
    const loadCompliance = () => {
        // Implementation would load compliance settings from storage/API
        toast.info("Compliance settings loaded");
    };
    // Save compliance settings
    const saveCompliance = () => {
        // Implementation would save to storage/API
        toast.success("Compliance settings saved");
    };
    // Reset compliance settings
    const resetCompliance = () => {
        setIsCompliantMode(false);
        setHasAcknowledgedTerms(false);
        setPrivacyLevel("standard");
        setDataRetentionDays(90);
        toast.info("Compliance settings reset to defaults");
    };
    // On mount, simulate loading data
    React.useEffect(() => {
        const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Simulate API call
                yield new Promise((resolve) => setTimeout(resolve, 1500));
                setIsLoaded(true);
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Unknown error";
                setError(errorMessage);
            }
        });
        loadData();
    }, []);
    return (_jsx(ComplianceContext.Provider, { value: {
            // Core properties
            isLoaded,
            error,
            // Auto-update functionality
            checkForUpdates,
            setAutoUpdate,
            isCheckingUpdates,
            lastChecked,
            autoUpdate,
            updatePreference,
            // Pending updates management
            pendingUpdates,
            isApplyingUpdate,
            applyUpdate,
            applyAllUpdates,
            scheduleComplianceCheck,
            enableAutoUpdates,
            // Mode toggles
            isCompliantMode,
            toggleCompliantMode,
            hasAcknowledgedTerms,
            acknowledgeTerms,
            // Data retention
            privacyLevel,
            setPrivacyLevel,
            dataRetentionDays,
            setDataRetentionDays,
            // Document management
            loadCompliance,
            saveCompliance,
            resetCompliance,
        }, children: children }));
};
// Create a hook for easy access to the compliance context
export const useCompliance = () => {
    return useContext(ComplianceContext);
};
