
import React from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { Card, CardContent } from '@/components/ui/card';
import { List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SocialMediaPostList from './SocialMediaPostList';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorRecoveryWrapper } from '@/components/dashboard/ErrorRecoveryWrapper';
import SocialMediaCalendarView from './calendar/SocialMediaCalendarView';
import { useBreakpoint } from '@/hooks/use-mobile';

interface PostsDisplayProps {
  view: 'calendar' | 'list';
  posts: SocialMediaPost[];
  isLoading: boolean;
  error: Error | null;
  currentMonth: Date;
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (id: string) => Promise<{ success: boolean; error?: string }>;
  onSchedulePost: (id: string) => Promise<{ success: boolean; error?: string }>;
  onApprovePost: (id: string, notes?: string) => Promise<{ success: boolean; error?: string }>;
  onCreatePost: () => void;
  "aria-label"?: string;
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
  onCreatePost,
  "aria-label": ariaLabel
}: PostsDisplayProps) {
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
  // Loading state
  if (isLoading) {
    return <LoadingSkeleton view={view} />;
  }
  
  // Error state
  if (error) {
    return (
      <ErrorRecoveryWrapper>
        <Card className="w-full">
          <CardContent className="p-6 text-center space-y-4">
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
  
  // Calendar view
  if (view === 'calendar') {
    return (
      <SocialMediaCalendarView
        posts={posts}
        currentMonth={currentMonth}
        onEditPost={onEditPost}
        onDeletePost={onDeletePost}
        onSchedulePost={onSchedulePost}
        onApprovePost={onApprovePost}
        aria-label={ariaLabel}
      />
    );
  }
  
  // List view
  return (
    <SocialMediaPostList
      posts={posts}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
      onSchedulePost={onSchedulePost}
      onApprovePost={onApprovePost}
      aria-label={ariaLabel}
    />
  );
}

// Loading state component with skeletons
function LoadingSkeleton({ view }: { view: 'calendar' | 'list' }) {
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
  if (view === 'calendar') {
    return (
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array(7).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-8 rounded-md" />
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {Array(35).fill(0).map((_, i) => (
            <Skeleton 
              key={i} 
              className={`min-h-[80px] sm:min-h-[120px] rounded-md ${i % 7 === 0 ? 'col-start-1' : ''}`} 
            />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {Array(isMobile ? 3 : 6).fill(0).map((_, i) => (
        <Card key={i} className="w-full overflow-hidden">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center gap-2 pt-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-20" />
              </div>
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
