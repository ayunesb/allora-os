
export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  platform?: string;
  metrics?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
  };
  createdAt: string;
  payment_status?: string;
  deployment_status?: string;
  platform_status?: string;
  ad_platform?: string;
}
