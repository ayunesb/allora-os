import React from 'react';
import { endOfMonth, format, startOfMonth, eachDayOfInterval, isSameDay, isToday, isWeekend, getDay, addDays } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
export function CalendarView({ posts, currentMonth, onCreatePost, onEditPost, onDeletePost, onSchedulePost, onApprovePost }) {
    // Get all days in the current month
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
    const startDay = getDay(monthStart);
    // Create placeholder days to offset the calendar grid
    const placeholders = Array.from({ length: startDay }, (_, i) => addDays(monthStart, -(startDay - i)));
    // Fix the getPostsForDay function:
    const getPostsForDay = (day) => {
        return posts.filter(post => {
            const postDate = post.scheduled_date
                ? new Date(`${post.scheduled_date}T${post.publish_time || '00:00'}:00`)
                : null;
            return postDate && isSameDay(postDate, day);
        });
    };
    // Get platform badge color
    const getPlatformColor = (platform) => {
        switch (platform.toLowerCase()) {
            case 'linkedin': return 'bg-blue-100 text-blue-800';
            case 'facebook': return 'bg-indigo-100 text-indigo-800';
            case 'instagram': return 'bg-pink-100 text-pink-800';
            case 'twitter': return 'bg-sky-100 text-sky-800';
            case 'tiktok': return 'bg-slate-100 text-slate-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    // Get status badge color
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'published': return 'bg-green-100 text-green-800';
            case 'scheduled': return 'bg-amber-100 text-amber-800';
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    // Calendar day cell component
    const DayCell = ({ day, isPlaceholder = false }) => {
        const dayPosts = isPlaceholder ? [] : getPostsForDay(day);
        const isWeekendDay = isWeekend(day);
        return (<div className={cn("border rounded-md p-2 min-h-[120px] flex flex-col", isToday(day) ? "border-primary" : "", isPlaceholder ? "bg-muted/50 opacity-50" : "", isWeekendDay ? "bg-gray-50" : "")}>
        <div className="flex justify-between items-center mb-1">
          <span className={cn("text-sm font-medium", isToday(day) ? "text-primary" : "", isPlaceholder ? "text-muted-foreground/50" : "")}>
            {format(day, 'd')}
          </span>
          
          {!isPlaceholder && (<Button variant="ghost" size="icon" className="h-6 w-6" onClick={onCreatePost}>
              <Plus className="h-3 w-3"/>
              <span className="sr-only">Add post</span>
            </Button>)}
        </div>
        
        {dayPosts.length > 0 ? (<div className="space-y-1 mt-1">
            {dayPosts.map((post) => (<div key={post.id} onClick={() => onEditPost && onEditPost(post)} className="text-xs p-1 rounded cursor-pointer hover:bg-muted flex flex-col">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className={cn("text-[10px] px-1 py-0", getPlatformColor(post.platform))}>
                    {post.platform}
                  </Badge>
                  <Badge variant="outline" className={cn("text-[10px] px-1 py-0", getStatusColor(post.status))}>
                    {post.status}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-1">{post.title || post.content}</p>
              </div>))}
          </div>) : (!isPlaceholder && (<div className="flex-1 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No posts</span>
            </div>))}
      </div>);
    };
    // Weekday header
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (<Card>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5"/>
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdays.map((day) => (<div key={day} className="text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {/* Placeholder days from previous month */}
          {placeholders.map((day, index) => (<DayCell key={`placeholder-${index}`} day={day} isPlaceholder={true}/>))}
          
          {/* Actual days of the month */}
          {days.map((day) => (<DayCell key={day.toISOString()} day={day}/>))}
        </div>
      </CardContent>
    </Card>);
}
