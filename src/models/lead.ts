
export type Lead = {
  id: string;
  campaign_id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
};
