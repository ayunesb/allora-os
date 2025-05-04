export type SocialPlatform = "Facebook" | "Twitter" | "Instagram" | "LinkedIn";
export type ContentType = "text" | "image" | "video" | "link";
export type PostStatus = "draft" | "scheduled" | "published";
export interface SocialMediaPost {
    id: string;
    title: string;
    content: string;
    platform: SocialPlatform;
    status: PostStatus;
    scheduled_date?: string;
    publish_time?: string;
    is_approved?: boolean;
    published_at?: string;
    content_type?: ContentType;
    tags?: string[];
    media_urls?: string[];
    link_url?: string;
    created_at?: string;
}
export interface CreatePostInput {
    title: string;
    content: string;
    platform: SocialPlatform;
    content_type: ContentType;
    scheduled_date?: string;
    publish_time?: string;
    media_urls?: string[];
    link_url?: string;
    tags?: string[];
}
export interface SocialMediaCalendarFilters {
    platform?: SocialPlatform | 'all';
    status?: PostStatus | 'all';
    dateRange?: [Date | null, Date | null];
    search?: string;
    content_type?: ContentType | 'all';
    campaign_id?: string;
    search_query?: string;
    date_range?: [Date | null, Date | null];
}
