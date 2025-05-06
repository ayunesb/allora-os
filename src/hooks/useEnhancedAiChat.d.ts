import { AiModelType } from "./useAiModelPreferences";
export declare function useEnhancedAiChat(): {
  isLoading: boolean;
  messages: any[];
  generateResponse: (
    botName: string,
    botRole: string,
    userMessage: string,
    includeRelevantMemory?: boolean,
    includeLearningContext?: boolean,
    modelOverride?: AiModelType,
  ) => Promise<any>;
  clearConversation: () => void;
};
