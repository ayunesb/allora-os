import { DebateParticipant } from "@/utils/consultation/types";
export declare const generateBotResponse: (
  bot: DebateParticipant,
  topic: string,
  riskAppetite?: string,
  businessPriority?: string,
) => Promise<string>;
