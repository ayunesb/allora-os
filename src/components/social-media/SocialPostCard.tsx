
import React from 'react';
import { SocialMediaPost } from '@/types/socialMedia';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, CalendarClock, CheckSquare, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/context/AccessibilityContext';

interface SocialPostCardProps {
  post: SocialMediaPost;
  onEdit: () => void;
  onDelete: () => Promise<{ success: boolean; error?: string }>;
  onSchedule: () => Promise<{ success: boolean; error?: string }>;
  onApprove: (notes?: string) => Promise<{ success: boolean; error?: string }>;
  compact?: boolean;
}

export default function SocialPostCard({
  post,
  onEdit,
  onDelete,
  onSchedule,
  onApprove,
  compact = false
}: SocialPostCardProps) {
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
      case 'Draft': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Scheduled': return 'bg-green-100 text-green-800 border-green-200';
      case 'Published': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className={cn(
        "rounded-md shadow-sm",
        compact ? "p-2" : "p-4"
      )}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap gap-1">
          <Badge className={getPlatformColor(post.platform)}>
            {post.platform}
          </Badge>
          
          <Badge variant="outline" className={getStatusColor(post.status || 'Draft')}>
            {post.status || 'Draft'}
          </Badge>
          
          {post.is_approved && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Approved
            </Badge>
          )}
        </div>
        
        <h4 className={cn(
          "font-medium",
          compact ? "text-sm" : "text-base"
        )}>
          {post.title}
        </h4>
        
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.content}
          </p>
        )}
        
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarClock className="h-3 w-3 mr-1" />
          <time dateTime={post.scheduled_date}>
            {format(parseISO(post.scheduled_date), 'MMM d, yyyy')} at {post.publish_time}
          </time>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2"
            onClick={onEdit}
            aria-label={screenReaderFriendly ? `Edit post: ${post.title}` : undefined}
          >
            <Pencil className="h-4 w-4 mr-1" />
            {compact ? '' : 'Edit'}
          </Button>
          
          {post.status === 'Draft' && post.is_approved && (
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 px-2"
              onClick={onSchedule}
              aria-label={screenReaderFriendly ? `Schedule post: ${post.title}` : undefined}
            >
              <CalendarClock className="h-4 w-4 mr-1" />
              {compact ? '' : 'Schedule'}
            </Button>
          )}
          
          {post.status === 'Draft' && !post.is_approved && (
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 px-2"
              onClick={() => onApprove()}
              aria-label={screenReaderFriendly ? `Approve post: ${post.title}` : undefined}
            >
              <CheckSquare className="h-4 w-4 mr-1" />
              {compact ? '' : 'Approve'}
            </Button>
          )}
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2 text-destructive hover:text-destructive"
            onClick={onDelete}
            aria-label={screenReaderFriendly ? `Delete post: ${post.title}` : undefined}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {compact ? '' : 'Delete'}
          </Button>
          
          {post.link_url && (
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 px-2"
              asChild
            >
              <a 
                href={post.link_url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={screenReaderFriendly ? `Visit link: ${post.link_url}` : undefined}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {compact ? '' : 'Visit Link'}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
