export type AiModelType = 'gpt-4o-mini' | 'gpt-4o' | 'anthropic-claude-3' | 'mistral-large';
export interface AiModelPreferences {
    modelPreference: AiModelType;
    enableMemory: boolean;
    enableLearning: boolean;
    enableVectorSearch: boolean;
    maxMemoryItems: number;
    lastUpdated: string;
    enableDebate: boolean;
    maxDebateParticipants: number;
}
export declare function useAiModelPreferences(): {
    preferences: AiModelPreferences;
    setPreferences: import("react").Dispatch<import("react").SetStateAction<AiModelPreferences>>;
    savePreferences: (newPreferences: AiModelPreferences) => Promise<boolean>;
    updatePreference: <K extends keyof AiModelPreferences>(key: K, value: AiModelPreferences[K]) => Promise<boolean>;
    updatePreferences: (updates: Partial<AiModelPreferences>) => Promise<boolean>;
    isLoading: boolean;
    isSaving: boolean;
};
