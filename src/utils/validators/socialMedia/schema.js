import { z } from 'zod';
export const socialMediaPostSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(1, 'Content is required'),
    platform: z.enum(['Facebook', 'Twitter', 'Instagram', 'LinkedIn'], {
        errorMap: () => ({ message: 'Invalid social media platform' })
    }),
    content_type: z.enum(['text', 'image', 'video', 'link'], {
        errorMap: () => ({ message: 'Invalid content type' })
    }),
    scheduled_date: z.string(),
    publish_time: z.string().optional(),
    media_urls: z.array(z.string().url()).optional(),
    link_url: z.string().url().optional().or(z.literal('')),
    campaign_id: z.string().optional().or(z.literal('')),
    tags: z.array(z.string()).optional()
});
