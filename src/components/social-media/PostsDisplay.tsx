
import React from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialMediaPostList } from './SocialMediaPostList';
import SocialMediaCalendarView from './SocialMediaCalendarView';

interface PostsDisplayProps {
  view: 'calendar' | 'list';
  posts: SocialMediaPost[];
  isLoading: boolean;
  error: string | null;
  currentMonth: Date;
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<{ success: boolean; error?: string }>;
  onSchedulePost: (postId: string) => Promise<{ success: boolean; error?: string }>;
  onApprovePost: (postId: string, notes?: string) => Promise<{ success: boolean; error?: string }>;
  onCreatePost: () => void;
}

export function PostsDisplay({
  view,
  posts,
  isLoading,
  error,
  currentMonth,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost,
  onCreatePost
}: PostsDisplayProps) {
  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Error State
  if (error && !isLoading) {
    return (
      <Card className="border-destructive">
        <CardContent className="p-4 text-destructive">
          <p>Error loading social media posts: {error}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Empty State
  if (!isLoading && !error && posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            You don't have any social media posts for this period. Create a new post to get started.
          </p>
          <Button onClick={onCreatePost}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Post
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Content Based on View
  return (
    <>
      {view === 'calendar' ? (
        <SocialMediaCalendarView 
          posts={posts} 
          currentMonth={currentMonth}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
          onSchedulePost={onSchedulePost}
          onApprovePost={onApprovePost}
        />
      ) : (
        <SocialMediaPostList 
          posts={posts} 
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
          onSchedulePost={onSchedulePost}
          onApprovePost={onApprovePost}
        />
      )}
    </>
  );
}
