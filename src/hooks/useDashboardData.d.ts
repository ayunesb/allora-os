export interface DashboardRecommendation {
  id: string | number;
  title: string;
  description: string;
  type: string;
  executiveBot: {
    name: string;
    role: string;
  };
  expectedImpact: number;
  timeframe: string;
}
export interface DashboardMetrics {
  leadConversion: number;
  campaignROI: number;
  engagementRate: number;
}
export interface RecentActivity {
  id: number;
  type: string;
  title: string;
  date: Date;
}
export interface DashboardData {
  recommendations: DashboardRecommendation[];
  metrics: DashboardMetrics;
  recentActivities: RecentActivity[];
}
export declare function useDashboardData(
  userId: string | undefined,
): import("@tanstack/react-query").UseQueryResult<DashboardData, Error>;
