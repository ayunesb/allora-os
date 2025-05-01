
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  SocialPlatform,
  ContentType,
  PostFormData
} from '@/types/socialMedia';
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { parseISO } from 'date-fns';

// Define props interface
interface SocialMediaPostFormProps {
  defaultValues?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function SocialMediaPostForm({ 
  defaultValues,
  onSubmit,
  isSubmitting = false 
}: SocialMediaPostFormProps) {
  // Setup form
  const form = useForm<PostFormData>({
    defaultValues: {
      title: defaultValues?.title || '',
      content: defaultValues?.content || '',
      platform: defaultValues?.platform || 'LinkedIn',
      scheduled_date: defaultValues?.scheduled_date || new Date().toISOString().split('T')[0],
      publish_time: defaultValues?.publish_time || '09:00',
      content_type: defaultValues?.content_type || 'text',
      media_urls: defaultValues?.media_urls || [],
      link_url: defaultValues?.link_url || '',
      campaign_id: defaultValues?.campaign_id || '',
      tags: defaultValues?.tags || []
    }
  });
  
  const selectedContentType = form.watch('content_type');
  
  const handleFormSubmit = (data: PostFormData) => {
    onSubmit(data);
  };

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title || '',
        content: defaultValues.content || '',
        platform: defaultValues.platform || 'LinkedIn',
        scheduled_date: defaultValues.scheduled_date || new Date().toISOString().split('T')[0],
        publish_time: defaultValues.publish_time || '09:00',
        content_type: defaultValues.content_type || 'text',
        media_urls: defaultValues.media_urls || [],
        link_url: defaultValues.link_url || '',
        campaign_id: defaultValues.campaign_id || '',
        tags: defaultValues.tags || []
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your post content..." className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Platform */}
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Type */}
        <FormField
          control={form.control}
          name="content_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        {/* Link URL (only for link type) */}
        {selectedContentType === 'link' && (
          <FormField
            control={form.control}
            name="link_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Scheduled Date */}
        <FormField
          control={form.control}
          name="scheduled_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheduled Date</FormLabel>
              <FormControl>
                <DatePicker 
                  date={field.value ? typeof field.value === 'string' ? parseISO(field.value) : field.value : undefined} 
                  setDate={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Publish Time */}
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

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save Post"}
        </Button>
      </form>
    </Form>
  );
}
