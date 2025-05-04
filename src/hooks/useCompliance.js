import { useContext } from 'react';
import { ComplianceContext } from '@/context/ComplianceContext';
export const useCompliance = () => {
    const context = useContext(ComplianceContext);
    if (!context) {
        throw new Error('useCompliance must be used within a ComplianceProvider');
    }
    // Provide default implementations for missing functions
    const extendedContext = {
        ...context,
        // Add missing properties with default implementations
        isLoaded: context.isLoaded !== undefined ? context.isLoaded : true,
        error: context.error || null,
        checkForUpdates: context.checkForUpdates || (() => console.warn('checkForUpdates not implemented')),
        setAutoUpdate: context.setAutoUpdate || ((v) => console.warn('setAutoUpdate not implemented', v)),
        isCheckingUpdates: context.isCheckingUpdates || false,
        lastChecked: context.lastChecked || null,
        autoUpdate: context.autoUpdate || false,
        updatePreference: context.updatePreference || ((key, value) => console.warn('updatePreference not implemented', key, value)),
        pendingUpdates: context.pendingUpdates || [],
        isApplyingUpdate: context.isApplyingUpdate || false,
        applyUpdate: context.applyUpdate || (async (id) => { }),
        applyAllUpdates: context.applyAllUpdates || (async () => { }),
        scheduleComplianceCheck: context.scheduleComplianceCheck || (async () => { }),
        enableAutoUpdates: context.enableAutoUpdates || (async () => false),
        isCompliantMode: context.isCompliantMode || false,
        toggleCompliantMode: context.toggleCompliantMode || (() => { }),
        hasAcknowledgedTerms: context.hasAcknowledgedTerms || false,
        acknowledgeTerms: context.acknowledgeTerms || (() => { }),
        privacyLevel: context.privacyLevel || 'standard',
        setPrivacyLevel: context.setPrivacyLevel || (() => { }),
        dataRetentionDays: context.dataRetentionDays || 90,
        setDataRetentionDays: context.setDataRetentionDays || (() => { }),
        loadCompliance: context.loadCompliance || (() => { }),
        saveCompliance: context.saveCompliance || (() => { }),
        resetCompliance: context.resetCompliance || (() => { })
    };
    return extendedContext;
};
export default useCompliance;
