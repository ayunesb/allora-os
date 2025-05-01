
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from 'lucide-react';
import { SocialMediaPost } from '@/types/socialMedia';
import { CalendarView } from './calendar/CalendarView';
import { ListView } from './list/ListView';
import { Loading } from '@/components/ui/loading';

interface PostsDisplayProps {
  view: 'list' | 'calendar';
  posts: SocialMediaPost[];
  currentMonth: Date;
  isLoading: boolean;
  error: Error | null;
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<any>;
  onSchedulePost: (postId: string) => Promise<any>;
  onApprovePost: (postId: string) => Promise<any>;
  onCreatePost: () => void;
  onRefresh?: () => void;
}

export function PostsDisplay({
  view,
  posts,
  currentMonth,
  isLoading,
  error,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost,
  onCreatePost,
  onRefresh,
}: PostsDisplayProps) {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="py-12">
        <Loading 
          center 
          text="Loading posts..." 
          tooltip="We're retrieving your social media posts. This should only take a moment."
        />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          Error loading posts: {error.message}. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  // Handle empty state
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">No posts found</h3>
        <p className="text-muted-foreground mb-4">
          {view === 'calendar' 
            ? "No posts scheduled for this month." 
            : "You haven't created any posts yet."
          }
        </p>
        <button
          onClick={onCreatePost}
          className="text-primary hover:underline"
        >
          Create your first post
        </button>
      </div>
    );
  }

  // Render the appropriate view
  return view === 'calendar' ? (
    <CalendarView 
      posts={posts} 
      currentMonth={currentMonth}
      onCreatePost={onCreatePost}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
      onSchedulePost={onSchedulePost}
      onApprovePost={onApprovePost}
      onRefresh={onRefresh}
    />
  ) : (
    <ListView 
      posts={posts}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
      onSchedulePost={onSchedulePost}
      onApprovePost={onApprovePost}
    />
  );
}
