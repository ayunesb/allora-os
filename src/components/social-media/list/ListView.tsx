
import React from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { PostCard } from './PostCard';

interface ListViewProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<any>;
  onSchedulePost: (postId: string) => Promise<any>;
  onApprovePost: (postId: string) => Promise<any>;
}

export function ListView({
  posts,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost,
}: ListViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard
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
