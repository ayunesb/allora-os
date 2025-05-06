interface CallScript {
  id: string;
  title: string;
  content: string;
  script_type: string;
  created_at: string;
}
interface CallScriptParams {
  companySize?: string | number;
  industry?: string;
  scriptType: string;
  productName?: string;
  targetAudience?: string;
}
export declare const useCallScripts: () => {
  scripts: CallScript[];
  isLoading: boolean;
  error: string;
  generateScript: (params: CallScriptParams) => Promise<any>;
  fetchScripts: () => Promise<void>;
};
export {};
