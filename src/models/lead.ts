
export type Lead = {
  id: string;
  campaignId: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
};
