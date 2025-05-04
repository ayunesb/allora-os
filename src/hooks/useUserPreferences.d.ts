import { AIModelType } from '@/utils/consultation/types';
export type UserPreferences = {
    responseStyle: 'concise' | 'balanced' | 'detailed';
    technicalLevel: 'basic' | 'intermediate' | 'advanced';
    showSources: boolean;
    focusArea: 'general' | 'strategy' | 'marketing' | 'operations' | 'technology' | 'finance';
    riskAppetite: 'low' | 'medium' | 'high';
    preferredExecutives: string[];
    favoriteTopics: string[];
    modelPreference: AIModelType;
    enableDebate?: boolean;
    maxDebateParticipants?: number;
    enableVectorSearch?: boolean;
    enableLearning?: boolean;
    writingStyle?: 'Casual' | 'Formal' | 'Visionary' | 'Strategic' | 'Aggressive';
    tone?: 'Friendly' | 'Confident' | 'Direct' | 'Inspiring';
};
export declare function useUserPreferences(): {
    preferences: UserPreferences;
    isLoading: boolean;
    savePreferences: (newPreferences: UserPreferences) => Promise<void>;
    updatePreference: (key: keyof UserPreferences, value: any) => Promise<void>;
    resetPreferences: () => Promise<void>;
    lastSyncTime: Date;
};
