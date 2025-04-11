
export interface CallScript {
  id: string;
  title: string;
  target: string;
  duration: string;
  status: "Ready" | "In Progress";
  content?: string;
  type?: 'call' | 'message';
  aiGenerated?: boolean;
  primaryBot?: any;
  collaborators?: any[];
}
