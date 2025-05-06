export interface CompanyProfile {
  name: string;
  industry: string;
  size?: string;
  founded?: string;
  location?: string;
  website?: string;
  description?: string;
  goals?: string[];
  challenges?: string[];
}
export declare const getOpenAIResponse: ({
  role,
  prompt,
}: {
  role: string;
  prompt: string;
}) => Promise<string>;
export declare const runExecutiveAgentHybrid: (
  executivePrompt: string,
  executive: string,
) => Promise<string>;
