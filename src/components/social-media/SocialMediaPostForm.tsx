
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
import { SocialMediaPost, SocialPlatform, PostContentType } from '@/types/socialMedia';
import { useCampaigns } from '@/hooks/campaigns/useCampaigns';
import { socialMediaPostSchema } from '@/utils/validators/socialMediaValidator';
import { sanitizeInput } from '@/utils/sanitizers';

/**
 * Form schema validation using Zod
 * Enforces data integrity and validation rules for social media posts
 */
const formSchema = socialMediaPostSchema;

type FormValues = z.infer<typeof formSchema>;

interface SocialMediaPostFormProps {
  /**
   * Optional existing post to edit
   * If provided, form will be pre-filled with post data
   */
  post?: SocialMediaPost;
  
  /**
   * Form submission handler
   * Returns a promise with submission result
   */
  onSubmit: (data: FormValues) => Promise<{ success: boolean; error?: string }>;
  
  /**
   * Whether form is currently submitting
   * Controls loading state of the submit button
   */
  isSubmitting?: boolean;
}

/**
 * Form component for creating and editing social media posts
 * 
 * This component handles:
 * - Creating new social media posts
 * - Editing existing posts
 * - Form validation using Zod schema
 * - Input sanitization for security
 * - Integration with campaign selection
 * 
 * @example
 * // Create a new post
 * <SocialMediaPostForm onSubmit={handleCreatePost} />
 * 
 * @example
 * // Edit an existing post
 * <SocialMediaPostForm post={existingPost} onSubmit={handleUpdatePost} />
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
        title: sanitizeInput(post.title),
        content: sanitizeInput(post.content),
        platform: post.platform as SocialPlatform, // Cast to SocialPlatform
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
  
  // Initialize form with validation schema
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  /**
   * Handle form submission
   * Passes validated form data to the onSubmit handler
   */
  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" aria-label="social-media-post-form">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter a title for your post" 
                  aria-describedby="title-description"
                />
              </FormControl>
              <FormDescription id="title-description">
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
                  aria-describedby="content-description"
                />
              </FormControl>
              <FormDescription id="content-description">
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
                    aria-describedby="scheduled-date-description"
                  />
                </FormControl>
                <FormDescription id="scheduled-date-description">
                  When to publish this post
                </FormDescription>
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
                    aria-describedby="publish-time-description"
                  />
                </FormControl>
                <FormDescription id="publish-time-description">
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
