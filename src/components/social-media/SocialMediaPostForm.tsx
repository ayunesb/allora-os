
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SocialMediaPost, SocialPlatform, ContentType } from '@/types/socialMedia';

// Define the form schema with Zod for validation
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  platform: z.enum(['LinkedIn', 'Facebook', 'Instagram', 'TikTok', 'Twitter'] as const),
  scheduled_date: z.string().min(1, { message: "Scheduled date is required." }),
  publish_time: z.string().min(1, { message: "Publish time is required." }),
  content_type: z.enum(['text', 'image', 'video', 'link', 'carousel', 'poll'] as const),
  media_urls: z.array(z.string().url()).optional(),
  link_url: z.string().url().optional().or(z.string().length(0)),
  campaign_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SocialMediaPostFormProps {
  post?: SocialMediaPost;
  onSubmit: (data: FormValues) => Promise<{ success: boolean; error?: string }>;
  isSubmitting: boolean;
}

export default function SocialMediaPostForm({ 
  post, 
  onSubmit,
  isSubmitting 
}: SocialMediaPostFormProps) {
  // Initialize form with default values or existing post
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: post ? {
      title: post.title,
      content: post.content,
      platform: post.platform,
      scheduled_date: post.scheduled_date,
      publish_time: post.publish_time,
      content_type: post.content_type,
      media_urls: post.media_urls || [],
      link_url: post.link_url || '',
      campaign_id: post.campaign_id || '',
      tags: post.tags || [],
    } : {
      title: '',
      content: '',
      platform: 'LinkedIn' as SocialPlatform,
      scheduled_date: new Date().toISOString().split('T')[0], // Today
      publish_time: '09:00',
      content_type: 'text' as ContentType,
      media_urls: [],
      link_url: '',
      campaign_id: '',
      tags: [],
    },
  });
  
  // Handle form submission
  const handleSubmit = async (values: FormValues) => {
    const result = await onSubmit(values);
    
    if (result.success) {
      form.reset(); // Reset form after successful submission for create form
    }
    
    return result;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your post content here..."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Write engaging content for your social media post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="scheduled_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scheduled Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                <FormLabel>Publish Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
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
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="poll">Poll</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="link_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link URL (Optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                Add a URL to your post if you want to include a link.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
