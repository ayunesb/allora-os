import { DebateMessage, DebateParticipant } from "@/utils/consultation/types";
export declare function useBotResponses(
  addMessage: (message: DebateMessage) => void,
  setIsLoading: (loading: boolean) => void,
): {
  simulateBotResponses: (
    participants: DebateParticipant[],
    topic: string,
    riskAppetite?: string,
    businessPriority?: string,
    preferences?: any,
  ) => Promise<void>;
};
