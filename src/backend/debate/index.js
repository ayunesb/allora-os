// Re-export all debate-related functionality
export * from "./debateTopics";
export * from "./participantManager";
export * from "./botResponseGenerator";
export * from "./sessionManager";
export * from "./summaryGenerator";
// Ensure debate topics are always available
import { debateTopics } from "./debateTopics";
export { debateTopics };
