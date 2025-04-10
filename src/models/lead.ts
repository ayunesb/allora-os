
export type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  created_at: string;
  campaign_id: string;
};
