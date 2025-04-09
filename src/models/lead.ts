
export type Lead = {
  id: string;
  campaign_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
  // For joins with campaigns table
  campaigns?: { name: string };
};
