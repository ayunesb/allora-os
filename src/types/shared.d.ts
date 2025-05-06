/**
 * Common shared types used across campaign and social media features
 */
/**
 * Common status types used across the application
 */
export type Status =
  | "draft"
  | "active"
  | "paused"
  | "completed"
  | "cancelled"
  | "pending"
  | "scheduled";
/**
 * Generic health status indicator
 */
export type HealthStatus = "good" | "warning" | "critical";
/**
 * Common social platforms used across the application
 */
export type SocialPlatform =
  | "Facebook"
  | "Instagram"
  | "Twitter"
  | "LinkedIn"
  | "TikTok"
  | "Google"
  | "Email"
  | "YouTube"
  | "Pinterest";
/**
 * Common filter parameters for list views
 */
export interface FilterParams {
  startDate?: string;
  endDate?: string;
  status?: string;
  platform?: string;
  search?: string;
}
/**
 * Generic pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}
/**
 * Common date range for analytics and reporting
 */
export interface DateRange {
  start: Date;
  end: Date;
}
/**
 * Generic performance metrics used across features
 */
export interface PerformanceMetrics {
  impressions?: number;
  clicks?: number;
  conversions?: number;
  ctr?: number;
  costPerClick?: number;
  costPerConversion?: number;
  spend?: number;
  roi?: number | string;
}
