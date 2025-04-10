
export type Strategy = {
  id: string;
  title: string;
  description: string;
  company_id: string;
  risk: 'Low' | 'Medium' | 'High'; // Primary field
  riskLevel?: 'Low' | 'Medium' | 'High'; // For backward compatibility
  risk_level?: 'Low' | 'Medium' | 'High'; // For backward compatibility with DB
  tags?: string[];
  created_at: string;
  updated_at?: string;
  executiveBot?: string;
  impact?: 'Low' | 'Medium' | 'High' | 'Very High';
  timeframe?: string;
  expectedROI?: string;
  successMetrics?: string[];
  status?: 'Draft' | 'In Progress' | 'Completed';
  progress?: number;
};
