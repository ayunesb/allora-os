
export type Strategy = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  created_at: string;
};
