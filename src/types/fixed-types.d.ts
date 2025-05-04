export interface User {
    id: string;
    email: string;
    role: 'admin' | 'user';
    company_id?: string;
    company?: string;
    industry?: string;
    avatar_url?: string;
    name?: string;
    app_metadata?: any;
}
export interface AuthContextProps {
    user: User | null;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    profile?: User;
}
export interface ExecutiveAgentProfile {
    name: string;
    role: string;
    expertise: string[];
    description: string;
    personality: string;
    decisionStyle: string;
}
export interface AgentOptions {
    saveToDatabase?: boolean;
    includeRiskAssessment?: boolean;
}
export interface BusinessEventPayload {
    eventType: string;
    data: Record<string, any>;
}
export interface CampaignPayload {
    campaignId: string;
    campaignTitle: string;
    platform: string;
    budget: number;
    owner: string;
    companyId: string;
}
export interface LeadPayload {
    leadId: string;
    leadName: string;
    company: string;
    email: string;
    source: string;
}
export interface ChecklistItem {
    id: string;
    name: string;
    description?: string;
    details?: string;
    status: 'pending' | 'error' | 'completed';
    statusMessage?: string;
    isRequired?: boolean;
}
export interface ChecklistCategory {
    name: string;
    description?: string;
    items: ChecklistItem[];
}
export interface ValidationResultsUI {
    databaseTables?: any[];
    databaseIndexes?: any[];
    databaseFunctions?: any[];
    rlsPolicies?: any[];
    policies?: any[];
}
export interface AccessibilityContextType {
    fontSize: number;
    setFontSize: (size: number) => void;
    updatePreference?: (key: string, value: any) => void;
    highContrast?: boolean;
    reducedMotion?: boolean;
    textToSpeech?: boolean;
    screenReaderFriendly?: boolean;
}
export interface LaunchProgressProps {
    totalItems: number;
    completedItems: number;
    status: 'pending' | 'in-progress' | 'completed' | 'error';
    isComplete?: boolean;
    launchStep?: number;
}
export interface LaunchInfoBoxProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    status: 'pending' | 'in-progress' | 'completed' | 'error';
    children?: React.ReactNode;
}
export interface LaunchInfoProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    status: 'pending' | 'in-progress' | 'completed' | 'error';
    children?: React.ReactNode;
}
export type WebhookType = 'zapier' | 'custom' | 'slack' | 'notion' | 'github' | 'stripe';
export type BusinessEventType = 'campaign_created' | 'strategy_approved' | 'lead_converted' | 'revenue_milestone' | 'user_onboarded' | 'campaign_launched' | 'lead_added';
export interface WebhookResult {
    success: boolean;
    message?: string;
    error?: any;
    statusCode?: number;
    responseData?: any;
}
