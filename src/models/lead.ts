
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';

export type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  created_at: string;
  campaign_id: string;
  campaigns?: {
    name: string;
  };
};
