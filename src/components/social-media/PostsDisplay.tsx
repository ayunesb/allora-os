
import React from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialMediaPostList } from './SocialMediaPostList';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorRecoveryWrapper } from '@/components/dashboard/ErrorRecoveryWrapper';

interface PostsDisplayProps {
  view: 'calendar' | 'list';
  posts: SocialMediaPost[];
  isLoading: boolean;
  error: Error | null;
  currentMonth: Date;
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (id: string) => void;
  onSchedulePost: (id: string) => void;
  onApprovePost: (id: string) => void;
  onCreatePost: () => void;
}

/**
 * Component to display posts in either list or calendar view
 * Handles loading, error, and empty states
 */
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
  
  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }
  
  // Error state
  if (error) {
    return (
      <ErrorRecoveryWrapper>
        <Card className="w-full p-6">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-destructive">Failed to load social media posts</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </ErrorRecoveryWrapper>
    );
  }
  
  // Empty state
  if (posts.length === 0) {
    return <EmptyState onCreatePost={onCreatePost} />;
  }
  
  // Calendar view not yet implemented - fallback to list view
  if (view === 'calendar') {
    return (
      <Card className="w-full p-6">
        <CardContent className="pt-6 text-center space-y-4">
          <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-medium">Calendar View</h3>
          <p className="text-sm text-muted-foreground">
            Calendar view is not yet available. Showing list view instead.
          </p>
          <div className="mt-6">
            <SocialMediaPostList
              posts={posts}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
              onSchedulePost={onSchedulePost}
              onApprovePost={onApprovePost}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // List view (default)
  return (
    <SocialMediaPostList
      posts={posts}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
      onSchedulePost={onSchedulePost}
      onApprovePost={onApprovePost}
    />
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <Card key={i} className="w-full">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Empty state component
function EmptyState({ onCreatePost }: { onCreatePost: () => void }) {
  return (
    <Card className="w-full min-h-[300px] flex flex-col items-center justify-center p-6">
      <CardContent className="pt-6 text-center space-y-4">
        <List className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="text-lg font-medium">No posts yet</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Create your first social media post to start building your content calendar.
        </p>
        <Button onClick={onCreatePost} className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </CardContent>
    </Card>
  );
}
