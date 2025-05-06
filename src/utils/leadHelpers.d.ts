import { Lead, LeadStatus } from "@/models/lead";
/**
 * Fetch leads for a specific campaign
 */
export declare function fetchCompanyLeads(companyId: string): Promise<Lead[]>;
/**
 * Update the status of a lead
 */
export declare function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
): Promise<boolean>;
/**
 * Delete a lead
 */
export declare function deleteLead(leadId: string): Promise<boolean>;
/**
 * Create a new lead
 */
export declare function createLead(
  leadData: Omit<Lead, "id" | "created_at">,
): Promise<Lead | null>;
export declare function getStatusColor(status: LeadStatus): string;
export declare function formatLeadData(lead: Lead): {
  status: LeadStatus;
  campaignName: string;
  id: string;
  name: string;
  email?: string;
  phone?: string;
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
  lastContact?: string;
  last_contact_date?: string;
  engagement_level?: number;
  follow_up_status?: "pending" | "in_progress" | "completed";
  follow_up_sequence_id?: string;
  linkedin_profile_url?: string;
  tags?: string[];
};
