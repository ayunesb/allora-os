export declare function useNotionTool(): {
  saveToNotion: (title: string, content: string) => Promise<any>;
  isLoading: boolean;
  error: string;
};
