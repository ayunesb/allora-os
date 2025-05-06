var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContext } from "react";
import { ComplianceContext } from "@/context/ComplianceContext";
export const useCompliance = () => {
    const context = useContext(ComplianceContext);
    if (!context) {
        throw new Error("useCompliance must be used within a ComplianceProvider");
    }
    // Provide default implementations for missing functions
    const extendedContext = Object.assign(Object.assign({}, context), { 
        // Add missing properties with default implementations
        isLoaded: context.isLoaded !== undefined ? context.isLoaded : true, error: context.error || null, checkForUpdates: context.checkForUpdates ||
            (() => console.warn("checkForUpdates not implemented")), setAutoUpdate: context.setAutoUpdate ||
            ((v) => console.warn("setAutoUpdate not implemented", v)), isCheckingUpdates: context.isCheckingUpdates || false, lastChecked: context.lastChecked || null, autoUpdate: context.autoUpdate || false, updatePreference: context.updatePreference ||
            ((key, value) => console.warn("updatePreference not implemented", key, value)), pendingUpdates: context.pendingUpdates || [], isApplyingUpdate: context.isApplyingUpdate || false, applyUpdate: context.applyUpdate || ((id) => __awaiter(void 0, void 0, void 0, function* () { })), applyAllUpdates: context.applyAllUpdates || (() => __awaiter(void 0, void 0, void 0, function* () { })), scheduleComplianceCheck: context.scheduleComplianceCheck || (() => __awaiter(void 0, void 0, void 0, function* () { })), enableAutoUpdates: context.enableAutoUpdates || (() => __awaiter(void 0, void 0, void 0, function* () { return false; })), isCompliantMode: context.isCompliantMode || false, toggleCompliantMode: context.toggleCompliantMode || (() => { }), hasAcknowledgedTerms: context.hasAcknowledgedTerms || false, acknowledgeTerms: context.acknowledgeTerms || (() => { }), privacyLevel: context.privacyLevel || "standard", setPrivacyLevel: context.setPrivacyLevel || (() => { }), dataRetentionDays: context.dataRetentionDays || 90, setDataRetentionDays: context.setDataRetentionDays || (() => { }), loadCompliance: context.loadCompliance || (() => { }), saveCompliance: context.saveCompliance || (() => { }), resetCompliance: context.resetCompliance || (() => { }) });
    return extendedContext;
};
export default useCompliance;
