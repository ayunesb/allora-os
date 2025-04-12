
import React from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Trash2, Clock, ThumbsUp, Copy, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/utils/formatters';

interface SocialMediaPostListProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<{ success: boolean; error?: string }>;
  onSchedulePost: (postId: string) => Promise<{ success: boolean; error?: string }>;
  onApprovePost: (postId: string, notes?: string) => Promise<{ success: boolean; error?: string }>;
}

/**
 * List view for social media posts
 * Displays posts in a table format with actions
 */
export default function SocialMediaPostList({
  posts,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost
}: SocialMediaPostListProps) {
  // Platform badge styles
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Facebook</Badge>;
      case 'Instagram':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Instagram</Badge>;
      case 'LinkedIn':
        return <Badge variant="outline" className="bg-blue-900 text-white">LinkedIn</Badge>;
      case 'Twitter':
        return <Badge variant="outline" className="bg-blue-400 text-white">Twitter</Badge>;
      case 'TikTok':
        return <Badge variant="outline" className="bg-black text-white">TikTok</Badge>;
      default:
        return <Badge variant="outline">{platform}</Badge>;
    }
  };
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Draft</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Scheduled</Badge>;
      case 'published':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Sort posts by scheduled date (most recent first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.scheduled_date).getTime() - new Date(a.scheduled_date).getTime()
  );
  
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approved</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{getPlatformBadge(post.platform)}</TableCell>
              <TableCell>{formatDate(post.scheduled_date, post.publish_time !== undefined, 'medium')}</TableCell>
              <TableCell>{getStatusBadge(post.status)}</TableCell>
              <TableCell>
                {post.is_approved ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Yes</Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">No</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditPost(post)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    
                    {post.status === 'draft' && (
                      <DropdownMenuItem onClick={() => onSchedulePost(post.id)}>
                        <Clock className="mr-2 h-4 w-4" />
                        Schedule
                      </DropdownMenuItem>
                    )}
                    
                    {!post.is_approved && (
                      <DropdownMenuItem onClick={() => onApprovePost(post.id)}>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={() => onDeletePost(post.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
