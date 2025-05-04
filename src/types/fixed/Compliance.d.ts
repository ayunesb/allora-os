export interface ExtendedComplianceContextType {
    pendingUpdates: string[];
    isApplyingUpdate: boolean;
    applyUpdate: (id: string) => void;
    applyAllUpdates: () => void;
    checkForUpdates: () => void;
    isCheckingUpdates: boolean;
    lastChecked?: string;
    autoUpdate?: boolean;
    setAutoUpdate?: (value: boolean) => void;
    isLoaded?: boolean;
    error?: any;
    updatePreference?: (key: string, value: any) => void;
    scheduleComplianceCheck?: () => Promise<void>;
    enableAutoUpdates?: () => Promise<boolean>;
    isCompliantMode?: boolean;
    toggleCompliantMode?: () => void;
    hasAcknowledgedTerms?: boolean;
    acknowledgeTerms?: () => void;
    privacyLevel?: 'standard' | 'strict' | 'custom';
    setPrivacyLevel?: (level: 'standard' | 'strict' | 'custom') => void;
    dataRetentionDays?: number;
    setDataRetentionDays?: (days: number) => void;
    loadCompliance?: () => void;
    saveCompliance?: () => void;
    resetCompliance?: () => void;
    policies?: {
        dataDeletion?: boolean;
        dataMinimization?: boolean;
        dataEncryption?: boolean;
        dataRetention?: boolean;
        ccpa?: boolean;
        gdpr?: boolean;
        [key: string]: boolean | undefined;
    };
}
