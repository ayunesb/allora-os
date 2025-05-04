import { DebateMessage } from '@/utils/consultation/types';
export declare function useMessageOperations(): {
    messages: DebateMessage[];
    favorites: string[];
    isLoading: boolean;
    setIsLoading: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setMessages: import("react").Dispatch<import("react").SetStateAction<DebateMessage[]>>;
    addMessage: (message: DebateMessage) => void;
    addSystemMessage: (content: string) => DebateMessage;
    voteMessage: (messageId: string, increment: boolean) => void;
    toggleFavorite: (messageId: string) => void;
};
