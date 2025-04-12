
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { SocialMediaPost, PostStatus } from '@/types/socialMedia';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay 
} from 'date-fns';

interface CalendarViewProps {
  posts: (SocialMediaPost & { status: PostStatus })[];
  currentMonth: Date;
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onSchedulePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onApprovePost: (postId: string) => Promise<{ success: boolean, error?: string }>;
  onCreatePost: () => void;
}

export function CalendarView({
  posts,
  currentMonth,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost,
  onCreatePost
}: CalendarViewProps) {
  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  // Group posts by date
  const postsByDate = posts.reduce((acc, post) => {
    const date = format(new Date(post.scheduled_date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(post);
    return acc;
  }, {} as Record<string, SocialMediaPost[]>);

  // Custom day renderer for the calendar
  const renderDay = (day: Date) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const dayPosts = postsByDate[formattedDay] || [];
    
    return (
      <div className="relative h-full min-h-[100px]">
        <div className="absolute top-0 left-0 p-1">{format(day, 'd')}</div>
        <div className="pt-6 px-1">
          {dayPosts.slice(0, 3).map((post) => (
            <div 
              key={post.id} 
              className={`mb-1 p-1 text-xs rounded truncate cursor-pointer hover:bg-gray-100 ${
                post.platform === 'Facebook' ? 'bg-blue-50' : 
                post.platform === 'Twitter' ? 'bg-sky-50' : 
                post.platform === 'LinkedIn' ? 'bg-indigo-50' : 
                post.platform === 'Instagram' ? 'bg-pink-50' : 'bg-gray-50'
              }`}
              onClick={() => onEditPost(post)}
            >
              {post.title}
            </div>
          ))}
          {dayPosts.length > 3 && (
            <div className="text-xs text-gray-500 mt-1">
              +{dayPosts.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Badge variant="outline">Facebook</Badge>
            <Badge variant="outline">Twitter</Badge>
            <Badge variant="outline">LinkedIn</Badge>
            <Badge variant="outline">Instagram</Badge>
          </div>
          <Button onClick={onCreatePost} size="sm">Add Post</Button>
        </div>
        
        <div className="calendar-container">
          <Calendar 
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            className="rounded-md border w-full"
            components={{
              Day: ({ date }) => renderDay(date),
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CalendarView;
