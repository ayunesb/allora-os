
import React from 'react';
import { SocialMediaPost, PostStatus } from '@/types/socialMedia';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Clock, ThumbsUp, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialPostCardProps {
  post: SocialMediaPost;
  onEdit: () => void;
  onDelete: () => void;
  onSchedule: () => void;
  onApprove: () => void;
  compact?: boolean;
}

/**
 * Card component for displaying a social media post
 * Can be used in regular or compact mode
 */
export default function SocialPostCard({
  post,
  onEdit,
  onDelete,
  onSchedule,
  onApprove,
  compact = false
}: SocialPostCardProps) {
  // Platform badge styles
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <Badge className="bg-blue-500">Facebook</Badge>;
      case 'Instagram':
        return <Badge className="bg-purple-600">Instagram</Badge>;
      case 'LinkedIn':
        return <Badge className="bg-blue-900">LinkedIn</Badge>;
      case 'Twitter':
        return <Badge className="bg-blue-400">Twitter</Badge>;
      case 'TikTok':
        return <Badge className="bg-black">TikTok</Badge>;
      default:
        return <Badge>{platform}</Badge>;
    }
  };
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'Scheduled':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Scheduled</Badge>;
      case 'Published':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Published</Badge>;
      case 'Failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <Card className={cn(compact ? "w-64" : "w-full")}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between space-y-0 pb-2",
        compact && "p-3"
      )}>
        <CardTitle className={cn(
          "font-semibold", 
          compact ? "text-sm" : "text-lg"
        )}>
          {post.title}
        </CardTitle>
        {getPlatformBadge(post.platform)}
      </CardHeader>
      <CardContent className={cn(compact && "p-3 pt-0")}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge(post.status || '')}
            {post.is_approved && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
            )}
          </div>
          
          <p className={cn(
            "text-muted-foreground", 
            compact ? "text-xs line-clamp-2" : "text-sm"
          )}>
            {post.content}
          </p>
          
          <div className={cn(
            "text-xs text-muted-foreground",
            compact && "text-[10px]"
          )}>
            Scheduled for: {format(parseISO(post.scheduled_date), 'MMM d, yyyy')}
            {post.publish_time && ` at ${post.publish_time}`}
          </div>
        </div>
      </CardContent>
      
      {!compact && (
        <CardFooter className="flex justify-between pt-0">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Button>
          
          <div className="space-x-2">
            {post.status === 'Draft' && (
              <Button variant="outline" size="sm" onClick={onSchedule}>
                <Clock className="mr-2 h-3 w-3" />
                Schedule
              </Button>
            )}
            
            {!post.is_approved && (
              <Button variant="outline" size="sm" onClick={onApprove}>
                <ThumbsUp className="mr-2 h-3 w-3" />
                Approve
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-3 w-3" />
              Delete
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
