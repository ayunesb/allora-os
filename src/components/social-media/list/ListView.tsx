import React from 'react';
import { PostCard } from './PostCard';
export function ListView({ posts, onEditPost, onDeletePost, onSchedulePost, onApprovePost, }) {
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (<PostCard key={post.id} post={post} onEdit={() => onEditPost(post)} onDelete={() => onDeletePost(post.id)} onSchedule={() => onSchedulePost(post.id)} onApprove={() => onApprovePost(post.id)}/>))}
    </div>);
}
