
export interface Campaign {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  platform: string;
  budget: number;
  start_date: string;
  startDate?: string; // Added for backward compatibility
  end_date?: string;
  owner_id: string;
  owner_name?: string;
  name?: string; // Added for backward compatibility
  created_at: string;
  updated_at?: string;
  company_id: string;
  target_audience?: string;
  kpis?: string[];
  metrics?: Record<string, any>;
  
  // Additional fields used in components
  payment_status?: string;
  deployment_status?: string;
  platform_status?: string;
  ad_platform?: string; // Alias for platform
}

export interface CampaignMetrics {
  views: number;
  clicks: number;
  conversions: number;
  cost: number;
  roi: number;
  engagements: number;
}

export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
