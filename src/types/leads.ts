export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: "new" | "contacted" | "qualified" | "client" | "closed";
  score?: number;
  lastContact?: string;
  created_at: string;
  campaign_id: string;
  phone?: string;
  source?: string;
  companyId?: string;
  campaigns?: any;
}
