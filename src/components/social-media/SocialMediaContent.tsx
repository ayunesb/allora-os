import React, { useState, useEffect } from 'react';
import { SocialMediaPost } from '@/types/fixed/SocialMedia';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Copy, Edit, RefreshCw, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import AlertMessage from '@/components/ui/AlertMessage';

interface SocialMediaContentProps {
  platform: string;
  filters?: any;
  onCreatePost?: () => void;
}

const LoadingState = () => (
  <div className="space-y-3">
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-24 w-full" />
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-6 w-32" />
  </div>
);

const EmptyState = ({ onCreatePost }: { onCreatePost?: () => void }) => (
  <div className="flex flex-col items-center justify-center h-64">
    <p className="text-muted-foreground mb-4">No posts found. Create your first post!</p>
    {onCreatePost && (
      <Button onClick={onCreatePost}>Create Post</Button>
    )}
  </div>
);

export default function SocialMediaContent({ platform, filters, onCreatePost }: SocialMediaContentProps) {
  const [posts, setPosts] = useState<SocialMediaPost[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");

  useEffect(() => {
    fetchPosts();
  }, [platform, filters]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('social_media_posts')
        .select('*')
        .eq('platform', platform);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.search) {
        query = query.ilike('content', `%${filters.search}%`);
      }

      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        query = query.eq('scheduled_date', formattedDate);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPosts(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchedulePost = async (postId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!selectedDate) {
        throw new Error("Please select a date to schedule the post.");
      }

      const formattedDate = selectedDate.toISOString();

      const { data, error } = await supabase
        .from('social_media_posts')
        .update({
          status: 'scheduled',
          scheduled_at: formattedDate,
        })
        .eq('id', postId)
        .select()

      if (error) {
        throw error;
      }

      fetchPosts();
      toast.success("Post scheduled successfully!");
    } catch (error: any) {
      setError(error);
      toast.error(error.message || "Failed to schedule post");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishPost = async (postId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', postId)
        .select()

      if (error) {
        throw error;
      }

      fetchPosts();
      toast.success("Post published successfully!");
    } catch (error: any) {
      setError(error);
      toast.error(error.message || "Failed to publish post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpublishPost = async (postId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .update({
          status: 'draft',
          published_at: null,
        })
        .eq('id', postId)
        .select()

      if (error) {
        throw error;
      }

      fetchPosts();
      toast.success("Post unpublished successfully!");
    } catch (error: any) {
      setError(error);
      toast.error(error.message || "Failed to unpublish post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .delete()
        .eq('id', postId)

      if (error) {
        throw error;
      }

      fetchPosts();
      toast.success("Post deleted successfully!");
    } catch (error: any) {
      setError(error);
      toast.error(error.message || "Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error !== null) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <AlertMessage 
            title="Error Loading Content" 
            description={error.message || "Failed to load social media content"} 
          />
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return <EmptyState onCreatePost={onCreatePost} />;
    }

    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/icons/${platform}-logo.png`} alt={`${platform} logo`} />
                  <AvatarFallback>{platform.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle>{platform}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              {post.media_urls && post.media_urls.length > 0 && (
                <img src={post.media_urls[0]} alt="Media" className="mt-4 rounded-md" />
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div>
                {post.status === 'scheduled' && post.scheduled_at && (
                  <Badge variant="secondary">
                    Scheduled for {new Date(post.scheduled_at).toLocaleString()}
                  </Badge>
                )}
                {post.status === 'published' && post.published_at && (
                  <Badge variant="default">
                    Published on {new Date(post.published_at).toLocaleString()}
                  </Badge>
                )}
                {post.status === 'draft' && (
                  <Badge variant="outline">Draft</Badge>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <Edit className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => {}}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {post.status === 'draft' && (
                    <DropdownMenuItem onClick={() => handlePublishPost(post.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Publish Now
                    </DropdownMenuItem>
                  )}
                  {post.status === 'published' && (
                    <DropdownMenuItem onClick={() => handleUnpublishPost(post.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Unpublish
                    </DropdownMenuItem>
                  )}
                  {post.status === 'draft' && (
                    <DropdownMenuItem onClick={() => handleSchedulePost(post.id)}>
                      <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Post
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{platform} Content</h2>
      <div className="flex items-center space-x-4">
        <DatePicker date={selectedDate} setDate={setSelectedDate} />
        <TimePicker time={selectedTime} setTime={setSelectedTime} />
      </div>
      {renderContent()}
    </div>
  );
}
