
export * from "./fixed/Campaign";
export * from "./fixed/Webhook";
export * from "./fixed/Layout";
export * from "./fixed/Accessibility";
export * from "./fixed/Compliance";
export * from "./fixed/SocialMedia";

// Add back these types needed for compatibility with components
import { WebhookEvent } from "./fixed/Webhook";
export type UnifiedWebhookEvent = WebhookEvent;

// Add missing types referenced in components
export interface UnifiedExecutiveMessage {
  id: string;
  created_at: string;
  from_executive?: string;
  to_executive?: string;
  content?: string;
  message_content?: string;
  status?: string;
}

export interface SocialMediaPost {
  id: string;
  title: string;
  content: string;
  platform: string;
  status: string;
  scheduled_date?: string;
  publish_time?: string;
  is_approved?: boolean;
  published_at?: string;
  content_type?: string;
  tags?: string[];
}

export type SocialPlatform = "Facebook" | "Twitter" | "Instagram" | "LinkedIn";
export type ContentType = "text" | "image" | "video" | "link";
export type PostStatus = "draft" | "scheduled" | "published";

export interface KPIMetric {
  id: string;
  type: string;
  value: number;
  recorded_at: string;
}
