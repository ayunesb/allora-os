import { z } from 'zod';
export declare const socialMediaPostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    platform: z.ZodEnum<["Facebook", "Twitter", "Instagram", "LinkedIn"]>;
    content_type: z.ZodEnum<["text", "image", "video", "link"]>;
    scheduled_date: z.ZodString;
    publish_time: z.ZodOptional<z.ZodString>;
    media_urls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    link_url: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    campaign_id: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    content?: string;
    title?: string;
    platform?: "Facebook" | "Twitter" | "Instagram" | "LinkedIn";
    campaign_id?: string;
    scheduled_date?: string;
    publish_time?: string;
    content_type?: "text" | "link" | "video" | "image";
    tags?: string[];
    media_urls?: string[];
    link_url?: string;
}, {
    content?: string;
    title?: string;
    platform?: "Facebook" | "Twitter" | "Instagram" | "LinkedIn";
    campaign_id?: string;
    scheduled_date?: string;
    publish_time?: string;
    content_type?: "text" | "link" | "video" | "image";
    tags?: string[];
    media_urls?: string[];
    link_url?: string;
}>;
export type SocialMediaPostSchema = z.infer<typeof socialMediaPostSchema>;
