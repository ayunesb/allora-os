export interface ExecutiveMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}
export declare const sendExecutiveMessage: () => Promise<{
  success: boolean;
}>;
export declare const getRecentMessages: () => Promise<ExecutiveMessage[]>;
export declare const fetchMessagesForExecutive: (
  executiveName: string,
) => Promise<ExecutiveMessage[]>;
