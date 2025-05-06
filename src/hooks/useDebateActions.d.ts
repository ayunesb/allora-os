import { DebateParticipant, DebateTopic } from "@/utils/consultation/types";
export default function useDebateActions(options: {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
  profile: any;
  participants: DebateParticipant[];
  selectedTopic: string;
  messages: any[];
  debateTitle: string;
  debateObjective: string;
  debateDuration: string;
  riskAppetite: "low" | "medium" | "high";
  businessPriority: string;
  addSystemMessage: (content: string) => any;
  setIsLoading: (isLoading: boolean) => void;
  setIsDebateActive: (isActive: boolean) => void;
  setMessages: (messages: any[]) => void;
  simulateBotResponses: (
    participants: DebateParticipant[],
    topic: string,
    riskAppetite?: string,
    businessPriority?: string,
  ) => void;
  getSelectedTopicDetails: () => DebateTopic | undefined;
}): {
  startDebate: () => Promise<void>;
  sendUserMessage: (
    content: string,
    participants: DebateParticipant[],
    topic: string,
    riskAppetite: string,
    businessPriority: string,
    sendMessage: (
      content: string,
      participants: DebateParticipant[],
      topic: string,
      riskAppetite?: string,
      businessPriority?: string,
    ) => void,
  ) => void;
};
