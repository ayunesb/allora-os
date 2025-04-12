
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SocialPlatform, PostContentType, SocialMediaPost } from '@/types/socialMedia';
import { useCampaigns } from '@/hooks/campaigns/useCampaigns';

// Form schema validation
const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(1, 'Content is required').max(2000, 'Content must be less than 2000 characters'),
  platform: z.enum(['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'] as const),
  content_type: z.enum(['text', 'image', 'video', 'link', 'carousel', 'poll'] as const),
  scheduled_date: z.string().min(1, 'Scheduled date is required'),
  publish_time: z.string().optional(),
  media_urls: z.array(z.string()).optional(),
  campaign_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SocialMediaPostFormProps {
  post?: SocialMediaPost;
  onSubmit: (data: FormValues) => Promise<{ success: boolean; error?: string }>;
  isSubmitting?: boolean;
}

/**
 * Form component for creating and editing social media posts
 */
export default function SocialMediaPostForm({
  post,
  onSubmit,
  isSubmitting = false
}: SocialMediaPostFormProps) {
  const { campaigns } = useCampaigns();
  
  // Set default values from post or use empty values
  const defaultValues: Partial<FormValues> = post
    ? {
        title: post.title,
        content: post.content,
        platform: post.platform,
        content_type: post.content_type,
        scheduled_date: post.scheduled_date,
        publish_time: post.publish_time,
        media_urls: post.media_urls || [],
        campaign_id: post.campaign_id,
        tags: post.tags || [],
      }
    : {
        title: '',
        content: '',
        platform: 'Facebook',
        content_type: 'text',
        scheduled_date: new Date().toISOString().split('T')[0],
        media_urls: [],
        tags: [],
      };
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Handle form submission
  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter a title for your post" />
              </FormControl>
              <FormDescription>
                A title to help you identify this post in your calendar
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the social media platform
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="text">Text Only</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="poll">Poll</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Type of content in this post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter your post content here"
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormDescription>
                The main content of your social media post
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="scheduled_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scheduled Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="publish_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Time (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
                </FormControl>
                <FormDescription>
                  When to publish on the scheduled date
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {campaigns && campaigns.length > 0 && (
          <FormField
            control={form.control}
            name="campaign_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Link to a campaign" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {campaigns.map(campaign => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Associate this post with a marketing campaign
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
