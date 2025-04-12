
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSocialMedia } from '@/hooks/social/useSocialMedia';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DialogCreate } from './SocialMediaPostDialog';
import SocialMediaPostList from './SocialMediaPostList';
import SocialMediaCalendarView from './SocialMediaCalendarView';
import { SocialMediaHeader } from './calendar/SocialMediaHeader';
import { SocialMediaFilters } from './calendar/SocialMediaFilters';
import { ViewToggle } from './calendar/ViewToggle';
import { SocialPlatform, PostStatus } from '@/types/socialMedia';

export default function SocialMediaCalendar() {
  const { profile } = useAuth();
  const {
    posts,
    isLoading,
    error,
    filters,
    setPostFilters,
    clearFilters,
    createPost,
    updatePost,
    deletePost,
    schedule,
    approve
  } = useSocialMedia();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Handle filter submission
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setPostFilters({
      platform: selectedPlatform as SocialPlatform | undefined,
      status: selectedStatus as PostStatus | undefined,
      search: searchQuery || undefined,
      startDate: format(startOfMonth(currentMonth), 'yyyy-MM-dd'),
      endDate: format(endOfMonth(currentMonth), 'yyyy-MM-dd')
    });
  };
  
  // Handle post creation
  const handleCreatePost = async (data: any) => {
    const result = await createPost({
      title: data.title,
      content: data.content,
      platform: data.platform,
      scheduled_date: data.scheduled_date,
      publish_time: data.publish_time,
      content_type: data.content_type,
      media_urls: data.media_urls,
      campaign_id: data.campaign_id,
      tags: data.tags
    });
    
    if (result.success) {
      setIsDialogOpen(false);
    }
    
    return result;
  };
  
  return (
    <div className="space-y-6">
      <SocialMediaHeader onCreatePost={() => setIsDialogOpen(true)} />
      
      <SocialMediaFilters 
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onApplyFilters={handleFilterSubmit}
        onClearFilters={() => {
          setSearchQuery('');
          setSelectedPlatform('');
          setSelectedStatus('');
          clearFilters();
        }}
      />
      
      <ViewToggle 
        view={view}
        onViewChange={(v) => setView(v)}
        postCount={posts.length}
      />
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Error State */}
      {error && !isLoading && (
        <Card className="border-destructive">
          <CardContent className="p-4 text-destructive">
            <p>Error loading social media posts: {error}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Content Based on View */}
      {!isLoading && !error && (
        <>
          {view === 'calendar' ? (
            <SocialMediaCalendarView 
              posts={posts} 
              currentMonth={currentMonth}
              onEditPost={(post) => console.log('Edit post', post)}
              onDeletePost={deletePost}
              onSchedulePost={schedule}
              onApprovePost={approve}
            />
          ) : (
            <SocialMediaPostList 
              posts={posts} 
              onEditPost={(post) => console.log('Edit post', post)}
              onDeletePost={deletePost}
              onSchedulePost={schedule}
              onApprovePost={approve}
            />
          )}
        </>
      )}
      
      {/* Empty State */}
      {!isLoading && !error && posts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              You don't have any social media posts for this period. Create a new post to get started.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Post
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Create Post Dialog */}
      <DialogCreate
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}
