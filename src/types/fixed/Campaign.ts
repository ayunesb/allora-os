
export interface Campaign {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  platform?: string;
  ad_platform?: string;
  status?: string;
  start_date?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  deployment_status?: string;
  payment_status?: string;
  platform_status?: string;
  channel?: string;
  summary?: string;
  tags?: string[];
  metrics?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    cost?: number;
    ctr?: number;
    cpc?: number;
    conversionRate?: number;
  };
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}
