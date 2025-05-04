export interface Campaign {
    id: string;
    name: string;
    platform: string;
    status: 'Draft' | 'Active' | 'Paused' | 'Completed';
    budget?: number;
    start_date?: string;
    end_date?: string;
    company_id: string;
    created_at: string;
    updated_at: string;
    is_archived?: boolean;
    description?: string;
    target_audience?: string[];
    goals?: string[];
    kpi_targets?: Record<string, number>;
    owner_id?: string;
    collaborators?: string[];
}
export interface CampaignMetrics {
    impressions: number;
    clicks: number;
    leads: number;
    conversions: number;
    ctr: number;
    cpc: number;
    cpa: number;
    spend: number;
    revenue: number;
    roi: number;
}
export interface CampaignFilters {
    status?: string;
    platform?: string;
    dateRange?: {
        start: Date;
        end: Date;
    };
    search?: string;
    tags?: string[];
}
export interface CreateCampaignInput {
    name: string;
    platform: string;
    status?: 'Draft' | 'Active' | 'Paused' | 'Completed';
    budget?: number;
    start_date?: string;
    end_date?: string;
    description?: string;
    target_audience?: string[];
    goals?: string[];
    kpi_targets?: Record<string, number>;
}
export interface UpdateCampaignInput {
    id: string;
    name?: string;
    platform?: string;
    status?: 'Draft' | 'Active' | 'Paused' | 'Completed';
    budget?: number;
    start_date?: string;
    end_date?: string;
    description?: string;
    target_audience?: string[];
    goals?: string[];
    kpi_targets?: Record<string, number>;
    is_archived?: boolean;
}
