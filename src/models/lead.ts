
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | string;

export type Lead = {
  id: string;
  campaign_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: LeadStatus;
  created_at: string;
  // For joins with campaigns table
  campaigns?: { name: string };
};
