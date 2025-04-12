
export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  budget?: number;
  status?: 'Draft' | 'Active' | 'Paused' | 'Completed';
  executiveBot?: string | { name: string };
  justification?: string;
  roi?: string;
  healthScore?: 'good' | 'warning' | 'critical';
  impressions?: number;
  clicks?: number;
  leads?: number;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  is_archived?: boolean;
  aiGenerated?: boolean;
  collaborators?: string[];
  description?: string;
}

export type Platform = "Google" | "LinkedIn" | "Facebook" | "Instagram" | "TikTok" | "Email" | "Twitter";
export type ExecutiveBot = string;
