import { Bot } from '@/types/fixed/Bot';
import { Message } from '@/types/fixed/Message';
export type { Bot };
export interface UseBotConsultationResult {
    bot: Bot | null;
    messages: Message[];
    isLoading: boolean;
    isTyping: boolean;
    error: string;
    retryCount: number;
    isVoiceEnabled?: boolean;
    isListening?: boolean;
    handleSendMessage: (text: string) => Promise<void>;
    retryLastMessage: () => void;
    clearConversation: () => void;
    toggleVoiceInterface?: () => void;
    startVoiceRecognition?: () => void;
}
export declare function useBotConsultation(botName: string, role?: string): UseBotConsultationResult;
