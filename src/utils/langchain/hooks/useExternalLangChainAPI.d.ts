interface ExternalAgentQuery {
  query: string;
  context?: Record<string, any>;
}
interface ExternalAgentResponse {
  result: string;
  error?: string;
}
export declare function useExternalLangChainAPI(): {
  executeQuery: (params: ExternalAgentQuery) => Promise<ExternalAgentResponse>;
  isLoading: boolean;
  result: string;
  error: string;
  clearResult: () => void;
  clearError: () => void;
};
export {};
