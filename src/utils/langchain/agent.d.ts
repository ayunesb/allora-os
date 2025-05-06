/**
 * Interface for agent query requests
 */
export interface AgentQuery {
  query: string;
  context?: Record<string, any>;
  userId?: string;
  companyId?: string;
}
/**
 * Interface for agent response
 */
export interface AgentResponse {
  result: string;
  toolCalls?: Array<{
    tool: string;
    input: Record<string, any>;
    output: any;
  }>;
  error?: string;
}
/**
 * Run the LangChain agent with the provided query and context
 */
export declare function runLangChainAgent(
  params: AgentQuery,
): Promise<AgentResponse>;
/**
 * Execute a specific tool directly without running the full agent
 */
export declare function executeAgentTool(
  toolName: string,
  input: Record<string, any>,
): Promise<any>;
