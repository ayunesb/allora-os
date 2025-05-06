export type CallScriptType = "call" | "message";
export type CallScriptStatus = "Ready" | "Draft" | "Coming Soon";
export interface CallScript {
  id: string;
  title: string;
  content: string;
  target: string;
  duration: string;
  status: CallScriptStatus;
  type: CallScriptType;
  aiGenerated?: boolean;
  executiveGenerated?: boolean;
  primaryBot?: {
    name: string;
    role: string;
    avatar?: string;
  };
  collaborators?: Array<{
    name: string;
    role: string;
    avatar?: string;
  }>;
}
