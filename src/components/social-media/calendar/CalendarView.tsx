
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SocialMediaPost } from '@/types/socialMedia';

interface CalendarViewProps {
  posts: SocialMediaPost[];
  selectedDate: Date;
  onSelectDate: (date: Date | undefined) => void;
  currentMonth: Date;
}

function CalendarView({
  posts,
  selectedDate,
  onSelectDate,
  currentMonth
}: CalendarViewProps) {
  // Group posts by date for highlighting
  const postsPerDay = React.useMemo(() => {
    const grouped: Record<string, SocialMediaPost[]> = {};
    
    posts.forEach(post => {
      const dateStr = post.scheduled_at ? 
        new Date(post.scheduled_at).toISOString().split('T')[0] : 
        '';
      
      if (dateStr) {
        if (!grouped[dateStr]) {
          grouped[dateStr] = [];
        }
        grouped[dateStr].push(post);
      }
    });
    
    return grouped;
  }, [posts]);

  // Function to render post count badges on calendar
  const dayRender = (day: Date) => {
    const dateStr = day.toISOString().split('T')[0];
    const postsForDay = postsPerDay[dateStr] || [];
    
    if (postsForDay.length > 0) {
      return (
        <div className="relative h-full w-full p-2">
          <div className="absolute top-0 right-0 -mt-1 -mr-1">
            <Badge variant="outline" className="bg-primary text-primary-foreground h-5 min-w-[20px] flex items-center justify-center text-xs">
              {postsForDay.length}
            </Badge>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          month={currentMonth}
          className="rounded-md border"
          components={{
            Day: ({ day, ...props }) => (
              <div {...props}>
                {props.children}
                {dayRender(day)}
              </div>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
}

export { CalendarView };
export default CalendarView;
