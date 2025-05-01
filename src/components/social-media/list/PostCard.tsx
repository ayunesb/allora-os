import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SocialMediaPost } from '@/types/socialMedia';
import { Edit, Trash, Calendar, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: SocialMediaPost;
  onEdit: () => void;
  onDelete: () => void;
  onSchedule: () => void;
  onApprove: () => void;
}

export function PostCard({
  post,
  onEdit,
  onDelete,
  onSchedule,
  onApprove,
}: PostCardProps) {
  // Function to get platform badge color
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return 'bg-blue-100 text-blue-800';
      case 'facebook': return 'bg-indigo-100 text-indigo-800';
      case 'instagram': return 'bg-pink-100 text-pink-800';
      case 'twitter': return 'bg-sky-100 text-sky-800';
      case 'tiktok': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fix date formatting
  const formatDate = (date?: string) => {
    if (!date) return 'Not scheduled';
    try {
      return format(new Date(date), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Determine which action buttons to show based on post status
  const renderActionButtons = () => {
    switch (post.status.toLowerCase()) {
      case 'draft':
        return (
          <>
            <Button variant="outline" size="sm" onClick={onSchedule}>
              <Calendar className="mr-1 h-4 w-4" />
              Schedule
            </Button>
            <Button variant="outline" size="sm" onClick={onApprove}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Publish
            </Button>
          </>
        );
      case 'scheduled':
        return (
          <>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={onApprove}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Publish Now
            </Button>
          </>
        );
      default:
        return (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="mr-1 h-4 w-4" />
            View
          </Button>
        );
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3 flex-row justify-between items-center space-y-0 gap-x-2">
        <Badge
          variant="outline"
          className={getPlatformColor(post.platform)}
        >
          {post.platform}
        </Badge>
        <Badge
          variant="outline"
          className={getStatusColor(post.status)}
        >
          {post.status}
        </Badge>
      </CardHeader>
      <CardContent className="px-4 py-3 flex-grow">
        <h3 className="font-medium mb-2">{post.title || post.content.substring(0, 50)}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
          {post.content}
        </p>
        
        <div className="text-xs text-muted-foreground mt-2">
          {post.scheduled_date ? (
            <p>Scheduled: {formatDate(`${post.scheduled_date}T${post.publish_time}:00`)}</p>
          ) : (
            <p>Not scheduled</p>
          )}
          
          {post.published_at && (
            <p className="mt-1">Published: {formatDate(post.published_at)}</p>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-between border-t">
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          {renderActionButtons()}
        </div>
      </CardFooter>
    </Card>
  );
}
