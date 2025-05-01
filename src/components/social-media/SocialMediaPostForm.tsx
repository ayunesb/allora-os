import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { useToast } from "@/components/ui/use-toast";
import {
  SocialPlatform,
  ContentType,
  PostStatus,
  SocialMediaPost,
} from '@/types/unified-types';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/hooks/useUser';
import AlertMessage from '@/components/ui/AlertMessage';
import { Loader2 } from 'lucide-react';

const postSchema = z.object({
  platform: z.enum(['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok']),
  content: z.string().min(1, { message: "Content is required." }),
  content_type: z.enum(['text', 'image', 'video', 'link', 'carousel', 'poll']),
  scheduled_date: z.string().optional(),
  scheduled_time: z.string().optional(),
  is_approved: z.boolean().default(false),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function SocialMediaPostForm() {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState<string>("12:00");
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      platform: "Facebook",
      content: "",
      content_type: "text",
      is_approved: false,
    },
  });

  const onSubmit = async (values: PostFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user?.userDetails?.company_id) {
        throw new Error("User company ID not found.");
      }

      let scheduled_at: string | null = null;
      if (isScheduling && scheduledDate) {
        const [hours, minutes] = scheduledTime.split(":");
        const scheduledDateTime = new Date(scheduledDate);
        scheduledDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        scheduled_at = scheduledDateTime.toISOString();
      }

      const postData: Omit<SocialMediaPost, 'id' | 'created_at' | 'updated_at'> = {
        platform: values.platform,
        content: values.content,
        content_type: values.content_type,
        status: isScheduling ? "scheduled" : "draft",
        is_approved: isApproved,
        company_id: user.userDetails.company_id,
        scheduled_at: scheduled_at || null,
        scheduled_date: scheduled_at ? new Date(scheduled_at).toLocaleDateString() : null,
        publish_time: scheduled_at ? new Date(scheduled_at).toLocaleTimeString() : null,
        published_at: null,
        media_urls: [],
        link_url: null,
        engagement: {},
        tags: [],
        title: null,
        campaign_id: null,
      };

      const { data, error } = await supabase
        .from('social_media_posts')
        .insert([postData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Success",
        description: "Post created successfully!",
      });
      form.reset();
      setScheduledDate(undefined);
      setScheduledTime("12:00");
    } catch (error: any) {
      setError(error.message || "Failed to create post");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create post",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-6">
      <h2 className="text-2xl font-bold tracking-tight">Create Social Media Post</h2>
      <p className="text-muted-foreground">Craft your message and schedule for optimal engagement.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
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

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your social media content here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Label htmlFor="schedule">Schedule Post?</Label>
            <Switch
              id="schedule"
              checked={isScheduling}
              onCheckedChange={setIsScheduling}
            />
          </div>

          {isScheduling && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="scheduled_date"
                  render={() => (
                    <FormItem>
                      <FormLabel>Scheduled Date</FormLabel>
                      <DatePicker
                        date={scheduledDate}
                        setDate={setScheduledDate}
                        label="Pick a date"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormItem>
                  <FormLabel>Scheduled Time</FormLabel>
                  <TimePicker time={scheduledTime} setTime={setTime} />
                </FormItem>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Label htmlFor="approve">Mark as Approved?</Label>
            <Switch
              id="approve"
              checked={isApproved}
              onCheckedChange={setIsApproved}
            />
          </div>

          {error && <AlertMessage description={error} />}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
