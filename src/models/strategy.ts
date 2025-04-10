
export type Strategy = {
  id: string;
  title: string;
  description: string;
  company_id: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  risk_level?: 'Low' | 'Medium' | 'High'; // For backward compatibility
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
