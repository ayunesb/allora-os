
import React from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { Card, CardContent } from '@/components/ui/card';
import SocialPostCard from './SocialPostCard';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Inbox } from 'lucide-react';

interface SocialMediaPostListProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (id: string) => Promise<any>;
  onSchedulePost: (id: string) => Promise<any>;
  onApprovePost: (id: string) => Promise<any>;
}

/**
 * Renders a list of social media posts
 * Responsive layout that switches to grid on larger screens
 */
export function SocialMediaPostList({
  posts,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost
}: SocialMediaPostListProps) {
  // Use media query to determine layout
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  // If no posts, show empty state
  if (!posts.length) {
    return (
      <Card className="w-full p-6">
        <CardContent className="pt-6 text-center">
          <Inbox className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-medium mt-4">No social media posts found</h3>
          <p className="text-sm text-muted-foreground mt-2">Create a new post to get started</p>
        </CardContent>
      </Card>
    );
  }
  
  // Sort posts by scheduled date (most recent first)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.scheduled_date).getTime() - new Date(a.scheduled_date).getTime();
  });
  
  // Filter posts into categories
  const scheduledPosts = sortedPosts.filter(post => post.status === 'Scheduled' || post.status === 'Published');
  const draftPosts = sortedPosts.filter(post => post.status === 'Draft');
  const otherPosts = sortedPosts.filter(post => 
    post.status !== 'Draft' && post.status !== 'Scheduled' && post.status !== 'Published'
  );
  
  // Desktop layout: Grid with separate sections
  if (isDesktop) {
    return (
      <div className="space-y-8">
        {scheduledPosts.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Scheduled & Published</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledPosts.map(post => (
                <SocialPostCard 
                  key={post.id}
                  post={post}
                  onEdit={() => onEditPost(post)}
                  onDelete={() => onDeletePost(post.id)}
                  onSchedule={() => onSchedulePost(post.id)}
                  onApprove={() => onApprovePost(post.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {draftPosts.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Drafts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {draftPosts.map(post => (
                <SocialPostCard 
                  key={post.id}
                  post={post}
                  onEdit={() => onEditPost(post)}
                  onDelete={() => onDeletePost(post.id)}
                  onSchedule={() => onSchedulePost(post.id)}
                  onApprove={() => onApprovePost(post.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {otherPosts.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Other Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherPosts.map(post => (
                <SocialPostCard 
                  key={post.id}
                  post={post}
                  onEdit={() => onEditPost(post)}
                  onDelete={() => onDeletePost(post.id)}
                  onSchedule={() => onSchedulePost(post.id)}
                  onApprove={() => onApprovePost(post.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Mobile layout: Simple list with optimized spacing
  return (
    <div className="space-y-4">
      {sortedPosts.map(post => (
        <SocialPostCard 
          key={post.id}
          post={post}
          onEdit={() => onEditPost(post)}
          onDelete={() => onDeletePost(post.id)}
          onSchedule={() => onSchedulePost(post.id)}
          onApprove={() => onApprovePost(post.id)}
        />
      ))}
    </div>
  );
}

export default SocialMediaPostList;
