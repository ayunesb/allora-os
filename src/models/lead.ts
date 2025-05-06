export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed"
  | "lost"
  | "client";

export type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  created_at: string;
  campaign_id: string;
  companyId?: string;
  company?: string;
  source?: string;
  score?: number;
  campaignId?: string;
  campaigns?: {
    name: string;
  };
  // Enhanced fields for advanced lead scoring
  lastContact?: string;
  last_contact_date?: string;
  engagement_level?: number; // 1-5 scale
  follow_up_status?: "pending" | "in_progress" | "completed";
  follow_up_sequence_id?: string;
  linkedin_profile_url?: string;
  tags?: string[];
};
