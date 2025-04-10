
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost' | 'client';

export type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  created_at: string;
  campaign_id: string;
  companyId?: string;
  source?: string;
  score?: number;
  campaignId?: string;
  campaigns?: {
    name: string;
  };
};
