
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Pencil, Trash } from 'lucide-react';

interface Post {
  id: string;
  title?: string;
  content: string;
  platform?: string;
  status?: string;
  scheduled_date?: string;
  created_at: string;
}

interface CalendarViewProps {
  posts: Post[];
  selectedDate: Date;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CalendarView({ posts, selectedDate, onEdit, onDelete }: CalendarViewProps) {
  // Function to filter posts for the selected date
  const getPostsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return posts.filter(post => {
      if (!post.scheduled_date) return false;
      
      try {
        const postDate = new Date(post.scheduled_date);
        return (
          postDate.getDate() === selectedDate.getDate() &&
          postDate.getMonth() === selectedDate.getMonth() &&
          postDate.getFullYear() === selectedDate.getFullYear()
        );
      } catch (e) {
        return false;
      }
    });
  };

  const selectedDatePosts = getPostsForSelectedDate();
  const formattedSelectedDate = format(selectedDate, 'MMMM d, yyyy');

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{formattedSelectedDate}</h3>
      
      {selectedDatePosts.length > 0 ? (
        <div className="grid gap-3">
          {selectedDatePosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{post.title || 'Untitled Post'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {post.platform || 'All Platforms'} • {post.status || 'Draft'}
                    </p>
                    <p className="text-sm mt-2 line-clamp-2">{post.content}</p>
                    {post.scheduled_date && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(post.scheduled_date), 'h:mm a')}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => onEdit(post.id)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => onDelete(post.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No posts scheduled for this date.</p>
      )}
    </div>
  );
}
