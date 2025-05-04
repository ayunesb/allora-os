import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, parseISO, isSameDay } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/use-mobile';
/**
 * Calendar view for social media posts
 * Displays posts organized by day in a monthly calendar format
 */
export function SocialMediaCalendarView({ posts, currentMonth, onEditPost, onDeletePost, onSchedulePost, onApprovePost }) {
    const breakpoint = useBreakpoint();
    const isMobile = ['xs', 'mobile'].includes(breakpoint);
    // Get all days in the current month
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    // Get the day of week for the first day (0 for Sunday, 1 for Monday, etc.)
    const startDay = monthStart.getDay();
    // Find posts for a specific day
    const getPostsForDay = (day) => {
        return posts.filter(post => {
            const postDate = post.scheduled_date ? parseISO(post.scheduled_date) : null;
            return postDate && isSameDay(postDate, day);
        });
    };
    // Get platform color
    const getPlatformColor = (platform) => {
        switch (platform) {
            case 'Facebook':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200';
            case 'Instagram':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-200';
            case 'LinkedIn':
                return 'bg-blue-900 text-white dark:bg-blue-700/50 dark:text-white';
            case 'Twitter':
                return 'bg-blue-400 text-white dark:bg-blue-500/50 dark:text-white';
            case 'TikTok':
                return 'bg-black text-white dark:bg-black/70 dark:text-white';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-200';
        }
    };
    return (<div className="bg-card rounded-lg border shadow">
      {/* Calendar Header - Days of Week */}
      <div className="grid grid-cols-7 gap-px bg-muted text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (<div key={day} className="py-2 text-sm font-medium">
            {isMobile ? day.charAt(0) : day}
          </div>))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-muted">
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: startDay }).map((_, index) => (<div key={`empty-start-${index}`} className="bg-card h-24 md:h-32"/>))}
        
        {/* Days of the month */}
        {days.map((day) => {
            const dayPosts = getPostsForDay(day);
            const isCurrentDay = isToday(day);
            return (<div key={day.toISOString()} className={cn("bg-card h-24 md:h-32 p-1 overflow-hidden relative", isCurrentDay && "ring-2 ring-primary ring-inset")}>
              {/* Date indicator */}
              <div className="text-xs font-medium mb-1">
                {format(day, 'd')}
              </div>
              
              {/* Posts for this day */}
              <div className="space-y-1">
                {dayPosts.slice(0, 3).map((post) => (<TooltipProvider key={post.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={cn("text-xs px-1.5 py-0.5 rounded truncate cursor-pointer", getPlatformColor(post.platform))} onClick={() => onEditPost(post)}>
                          {post.title || post.content.substring(0, 20)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{post.title || 'Untitled'}</p>
                        <p className="text-xs">{post.platform} - {post.status}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>))}
                
                {/* More indicator if there are additional posts */}
                {dayPosts.length > 3 && (<div className="text-xs text-muted-foreground text-center">
                    +{dayPosts.length - 3} more
                  </div>)}
              </div>
            </div>);
        })}
      </div>
    </div>);
}
export default SocialMediaCalendarView;
