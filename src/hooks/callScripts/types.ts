
export type CallScriptType = 'call' | 'message';

export interface CallScript {
  id: string;
  title: string;
  content: string;
  target: string;
  duration: string;
  status: 'Draft' | 'Ready' | 'In Review';
  type: CallScriptType;
  aiGenerated?: boolean;
  executiveGenerated?: boolean;
  executiveStyle?: string;
  primaryBot?: {
    name: string;
    role: string;
  };
  collaborators?: Array<{
    name: string;
    role: string;
  }>;
}

export interface ScriptBuilderParams {
  industryType: string;
  targetAudience: string;
  communicationGoal: string;
  companyName?: string;
  keyPoints?: string[];
  tonality?: 'Formal' | 'Casual' | 'Persuasive' | 'Educational';
  duration?: 'Short' | 'Medium' | 'Long';
}

export interface ScriptRepository {
  getMyScripts(): Promise<CallScript[]>;
  getAiGeneratedScripts(): Promise<CallScript[]>;
  getExecutiveScripts(): Promise<CallScript[]>;
  saveScript(script: Omit<CallScript, 'id'>): Promise<CallScript>;
  updateScript(id: string, updates: Partial<CallScript>): Promise<CallScript>;
  deleteScript(id: string): Promise<boolean>;
}
