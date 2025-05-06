export interface MemoryContext {
  previousInteractions: string[];
  userPreferences?: Record<string, any>;
  companyData?: Record<string, any>;
}
export interface ConversationMemory {
  id: string;
  userId: string;
  botId: string;
  memoryContext: MemoryContext;
  lastUpdated: Date;
}
export declare function storeConversationMemory(
  userId: string,
  botId: string,
  userMessage: string,
  botResponse: string,
): Promise<boolean>;
export declare function getConversationMemory(
  userId: string,
  botId: string,
): Promise<ConversationMemory | null>;
export declare function storeUserPreferences(
  userId: string,
  botId: string,
  preferences: Record<string, any>,
): Promise<boolean>;
export declare function storeCompanyData(
  userId: string,
  botId: string,
  companyData: Record<string, any>,
): Promise<boolean>;
