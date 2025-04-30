
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ViewToggle } from './calendar/ViewToggle';

interface SocialMediaCalendarViewProps {
  posts: any[];
  onCreatePost: () => void;
  onEditPost: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

export function SocialMediaCalendarView({
  posts,
  onCreatePost,
  onEditPost,
  onDeletePost
}: SocialMediaCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  // Count posts for the month if in calendar view
  const postCount = posts.length;

  // Function to handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Function to filter posts for the selected date
  const getPostsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return posts.filter(post => {
      // Safely handle potentially undefined scheduled_date
      if (!post.scheduled_date) return false;
      
      const postDate = new Date(post.scheduled_date);
      return (
        postDate.getDate() === selectedDate.getDate() &&
        postDate.getMonth() === selectedDate.getMonth() &&
        postDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  // Get posts for the selected date
  const selectedDatePosts = getPostsForSelectedDate();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <ViewToggle view={view} onViewChange={setView} postCount={postCount} />
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
            </span>
          </Button>
          
          <Button onClick={onCreatePost}>Create Post</Button>
        </div>
      </div>

      {view === 'calendar' && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              </div>
              
              <div className="md:w-1/2">
                <h3 className="font-medium text-lg mb-4">
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
                </h3>
                
                {selectedDatePosts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDatePosts.map(post => (
                      <Card key={post.id} className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{post.title || 'Untitled Post'}</h4>
                            <p className="text-sm text-muted-foreground">
                              {post.platform || 'All Platforms'} • {post.status || 'Draft'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => onEditPost(post.id)}>Edit</Button>
                            <Button variant="ghost" size="sm" onClick={() => onDeletePost(post.id)}>Delete</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No posts scheduled for this date.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {view === 'list' && (
        // List view implementation will go here
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map(post => (
                  <Card key={post.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{post.title || 'Untitled Post'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {post.platform || 'All Platforms'} • {post.status || 'Draft'}
                        </p>
                        <p className="text-sm mt-1">
                          {post.scheduled_date ? format(new Date(post.scheduled_date), 'PPP') : 'Not scheduled'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onEditPost(post.id)}>Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => onDeletePost(post.id)}>Delete</Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No posts available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
