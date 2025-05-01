
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreVertical, Trash, Clock, Check, Plus } from "lucide-react";
import { format } from 'date-fns';
import { SocialMediaPost } from '@/types/socialMedia';

interface ListViewProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onSchedulePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onApprovePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onCreatePost: () => void;
}

export function ListView({
  posts,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost,
  onCreatePost
}: ListViewProps) {
  const handleDeleteClick = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await onDeletePost(postId);
  };
  
  const handleScheduleClick = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await onSchedulePost(postId);
  };
  
  const handleApproveClick = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await onApprovePost(postId);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      case 'published':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge>;
      case 'approved':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Approved</Badge>;
      default:
        return <Badge variant="outline">{status || 'Draft'}</Badge>;
    }
  };
  
  const getPlatformBadge = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Facebook</Badge>;
      case 'twitter':
        return <Badge className="bg-sky-100 text-sky-800 border-sky-200">Twitter</Badge>;
      case 'linkedin':
        return <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">LinkedIn</Badge>;
      case 'instagram':
        return <Badge className="bg-pink-100 text-pink-800 border-pink-200">Instagram</Badge>;
      default:
        return <Badge variant="outline">{platform}</Badge>;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4 flex justify-end">
          <Button onClick={onCreatePost} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow 
                key={post.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onEditPost(post)}
              >
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{getPlatformBadge(post.platform)}</TableCell>
                <TableCell>
                  {post.scheduled_date ? format(new Date(post.scheduled_date), 'MMM d, yyyy') : 'Not scheduled'}
                </TableCell>
                <TableCell>{getStatusBadge(post.status || 'Draft')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onEditPost(post);
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {(post.status?.toLowerCase() !== 'published') && (
                        <DropdownMenuItem onClick={(e) => handleScheduleClick(post.id, e)}>
                          <Clock className="mr-2 h-4 w-4" />
                          Schedule
                        </DropdownMenuItem>
                      )}
                      {(post.status?.toLowerCase() !== 'approved') && (
                        <DropdownMenuItem onClick={(e) => handleApproveClick(post.id, e)}>
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={(e) => handleDeleteClick(post.id, e)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ListView;
