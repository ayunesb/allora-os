export declare function useBoardroomData(companyId?: string | null): {
  topic: string;
  summary: string;
  executives: any[];
  discussion: any[];
  conclusion: string;
  isLoading: boolean;
  error: string;
  timeoutError: boolean;
  sampleDebate: {
    topic: string;
    summary: string;
    executives: {
      id: string;
      name: string;
      role: string;
      title: string;
    }[];
    discussion: {
      speaker: string;
      message: string;
    }[];
    conclusion: string;
  };
};
