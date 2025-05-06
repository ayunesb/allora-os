import { DebateMessage, DebateParticipant } from "@/utils/consultation/types";
export default function useDebateMessages(): {
  messages: DebateMessage[];
  favorites: string[];
  isLoading: boolean;
  setIsLoading: import("react").Dispatch<
    import("react").SetStateAction<boolean>
  >;
  setMessages: import("react").Dispatch<
    import("react").SetStateAction<DebateMessage[]>
  >;
  addSystemMessage: (content: string) => DebateMessage;
  simulateBotResponses: (
    participants: DebateParticipant[],
    topic: string,
    riskAppetite?: string,
    businessPriority?: string,
    preferences?: any,
  ) => Promise<void>;
  sendUserMessage: (
    content: string,
    participants: DebateParticipant[],
    topic: string,
    riskAppetite?: string,
    businessPriority?: string,
  ) => Promise<void>;
  voteMessage: (messageId: string, increment: boolean) => void;
  toggleFavorite: (messageId: string) => void;
};
