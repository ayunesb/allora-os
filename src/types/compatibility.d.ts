import { User } from "./fixed/User";
import { WebhookEvent, WebhookType, BusinessEventType } from "./fixed/Webhook";
import {
  SocialMediaPost,
  SocialPlatform,
  ContentType,
  PostStatus,
} from "./unified-types";
export type UserRole = "admin" | "user";
export type WebhookStatus = "success" | "failed" | "pending";
export type { WebhookType, BusinessEventType };
export interface UnifiedWebhookEvent extends Partial<WebhookEvent> {
  type?: WebhookType;
  event_type?: string;
  timestamp?: string;
  webhookType?: WebhookType;
  eventType?: string;
  targetUrl?: string;
  url?: string;
  source?: string;
}
export interface LegacySocialPost extends Partial<SocialMediaPost> {
  scheduled_at?: string;
}
export type PostContentType = ContentType;
export type { SocialPlatform, ContentType, PostStatus, User };
