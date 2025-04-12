
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Badge
} from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, CheckCircle, Clock } from 'lucide-react';
import { SocialMediaPost, PostStatus } from '@/types/socialMedia';

interface SocialMediaPostListProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => void;
  onSchedulePost: (postId: string) => void;
  onApprovePost: (postId: string) => void;
}

export function SocialMediaPostList({ 
  posts,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost
}: SocialMediaPostListProps) {
  // Function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Content Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No posts found. Create your first post to get started.
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {post.platform}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(post.scheduled_date)}</TableCell>
                <TableCell>
                  <StatusBadge status={post.status || 'Draft'} />
                </TableCell>
                <TableCell className="capitalize">{post.content_type}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditPost(post)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    
                    {!post.is_approved && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onApprovePost(post.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                    )}
                    
                    {post.status !== 'Scheduled' && post.status !== 'Published' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onSchedulePost(post.id)}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="sr-only">Schedule</span>
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper component for displaying status badges
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'Draft':
      return <Badge variant="outline">Draft</Badge>;
    case 'Scheduled':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Scheduled</Badge>;
    case 'Published':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Published</Badge>;
    case 'Approved':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Approved</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default SocialMediaPostList;
