
import React, { useState } from 'react';
import { useSocialMedia } from '@/hooks/social/useSocialMedia';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialMediaHeader } from './calendar/SocialMediaHeader';
import { SocialMediaFilters } from './calendar/SocialMediaFilters';
import { ViewToggle } from './calendar/ViewToggle';
import { PostStatus, SocialPlatform } from '@/types/socialMedia';
import { DialogCreate } from './SocialMediaPostDialog';
import { PostsDisplay } from './PostsDisplay';
import { toast } from 'sonner';

export default function SocialMediaCalendar() {
  // Core state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Social media data and operations
  const {
    posts,
    isLoading,
    error,
    filters,
    setPostFilters,
    clearFilters,
    createPost,
    deletePost,
    schedule,
    approve
  } = useSocialMedia();
  
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
      toast.success('Post created successfully');
      setIsDialogOpen(false);
    } else {
      toast.error(result.error || 'Failed to create post');
    }
    
    return result;
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <SocialMediaHeader onCreatePost={() => setIsDialogOpen(true)} />
      
      {/* Filters */}
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
      
      {/* View Toggle */}
      <ViewToggle 
        view={view}
        onViewChange={(v) => setView(v)}
        postCount={posts.length}
      />
      
      {/* Content Display */}
      <PostsDisplay
        view={view}
        posts={posts}
        isLoading={isLoading}
        error={typeof error === 'object' && error !== null ? error as Error : error ? new Error(String(error)) : null}
        currentMonth={currentMonth}
        onEditPost={(post) => console.log('Edit post', post)}
        onDeletePost={deletePost}
        onSchedulePost={schedule}
        onApprovePost={approve}
        onCreatePost={() => setIsDialogOpen(true)}
      />
      
      {/* Create Post Dialog */}
      <DialogCreate
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}
