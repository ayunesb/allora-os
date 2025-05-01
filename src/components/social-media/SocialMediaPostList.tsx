
import React from 'react';
import { SocialMediaPost } from '@/types/unified-types';
import { Card, CardContent } from '@/components/ui/card';
import { MoreHorizontal, Calendar, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/hooks/useAccessibility';

interface SocialMediaPostListProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (id: string) => Promise<{ success: boolean; error?: string }>;
  onSchedulePost: (id: string) => Promise<{ success: boolean; error?: string }>;
  onApprovePost: (id: string, notes?: string) => Promise<{ success: boolean; error?: string }>;
  "aria-label"?: string;
}

export default function SocialMediaPostList({
  posts,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost,
  "aria-label": ariaLabel
}: SocialMediaPostListProps) {
  const { screenReaderFriendly } = useAccessibility();
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Facebook': return 'bg-blue-100 text-blue-800';
      case 'Instagram': return 'bg-purple-100 text-purple-800';
      case 'LinkedIn': return 'bg-blue-900 text-white';
      case 'Twitter': return 'bg-blue-400 text-white';
      case 'TikTok': return 'bg-black text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'scheduled': return 'bg-green-100 text-green-800 border-green-200';
      case 'published': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      className="space-y-4"
      role={screenReaderFriendly ? "list" : undefined}
      aria-label={ariaLabel}
    >
      {posts.map((post) => (
        <Card 
          key={post.id} 
          className="overflow-hidden hover:shadow-md transition-shadow"
          role={screenReaderFriendly ? "listitem" : undefined}
        >
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={cn("font-normal", getPlatformColor(post.platform))}>
                    {post.platform}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(post.status)}>
                    {post.status}
                  </Badge>
                  {post.is_approved && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-medium mb-1" onClick={() => onEditPost(post)}>
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {post.content}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.scheduled_date}>
                    {format(parseISO(post.scheduled_date!), 'MMM d, yyyy')}{post.publish_time ? ` at ${post.publish_time}` : ''}
                  </time>
                </div>
              </div>
              
              <div className="flex items-center gap-2 self-end sm:self-auto mt-2 sm:mt-0">
                {post.status === 'draft' && !post.is_approved && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onApprovePost(post.id)}
                    aria-label={screenReaderFriendly ? `Approve post: ${post.title}` : undefined}
                  >
                    Approve
                  </Button>
                )}
                
                {post.status === 'draft' && post.is_approved && (
                  <Button 
                    size="sm" 
                    onClick={() => onSchedulePost(post.id)}
                    aria-label={screenReaderFriendly ? `Schedule post: ${post.title}` : undefined}
                  >
                    Schedule
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      aria-label={screenReaderFriendly ? `More options for post: ${post.title}` : "More options"}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEditPost(post)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDeletePost(post.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
