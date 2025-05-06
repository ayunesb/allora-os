import { type AgentResponse } from "../agent";
export declare function useAgentQuery(options: {
  onSuccess?: (data: AgentResponse) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}): {
  executeQuery: (
    newQuery: string,
    newContext?: Record<string, any>,
  ) => Promise<AgentResponse>;
  result: string;
  toolCalls: {
    tool: string;
    input: Record<string, any>;
    output: any;
  }[];
  isLoading: boolean;
  error: string | Error;
  setContext: import("react").Dispatch<
    import("react").SetStateAction<Record<string, any>>
  >;
};
