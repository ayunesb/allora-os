
export type Strategy = {
  id: string;
  title: string;
  description: string;
  user_id: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  tags?: string[];
  created_at: string;
  updated_at?: string;
  executiveBot?: string;
  impact?: 'Low' | 'Medium' | 'High' | 'Very High';
  timeframe?: string;
  expectedROI?: string;
  successMetrics?: string[];
  status?: 'Draft' | 'Active' | 'Completed';
};
