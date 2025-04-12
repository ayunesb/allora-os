
import React, { FormEvent } from 'react';
import { useSocialMediaContext } from '@/context/SocialMediaContext';
import { SocialMediaHeader } from './calendar/SocialMediaHeader';
import { SocialMediaFilters } from './calendar/SocialMediaFilters';
import { ViewToggle } from './calendar/ViewToggle';
import { PostsDisplay } from './PostsDisplay';
import { DialogCreate } from './SocialMediaPostDialog';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { toast } from 'sonner';
import { useAccessibility } from '@/context/AccessibilityContext';

export function SocialMediaContent() {
  const {
    posts,
    isLoading,
    error,
    view,
    setView,
    currentMonth,
    setCurrentMonth,
    searchQuery,
    setSearchQuery,
    selectedPlatform,
    setSelectedPlatform,
    selectedStatus,
    setSelectedStatus,
    setPostFilters,
    clearFilters,
    isCreateDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    createPost,
    deletePost,
    schedule,
    approve
  } = useSocialMediaContext();
  
  const { screenReaderFriendly } = useAccessibility();
  
  // Handle filter submission
  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    setPostFilters({
      platform: selectedPlatform as any || undefined,
      status: selectedStatus as any || undefined,
      search: searchQuery || undefined,
      startDate: format(startOfMonth(currentMonth), 'yyyy-MM-dd'),
      endDate: format(endOfMonth(currentMonth), 'yyyy-MM-dd')
    });
    
    // Provide feedback
    toast.success('Filters applied successfully');
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('');
    setSelectedStatus('');
    clearFilters();
    
    // Provide feedback
    toast.info('Filters have been cleared');
  };
  
  // Format the error object correctly for PostsDisplay
  const formattedError = error 
    ? (error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Unknown error')) 
    : null;
  
  // Handle create post with feedback
  const handleCreatePost = async (data: any) => {
    try {
      await createPost(data);
      toast.success('Post created successfully');
      return { success: true };
    } catch (err) {
      toast.error('Failed to create post');
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  };
  
  // Handle delete post with confirmation
  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      toast.success('Post deleted successfully');
      return { success: true };
    } catch (err) {
      toast.error('Failed to delete post');
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  };
  
  // Handle schedule post with feedback
  const handleSchedulePost = async (postId: string) => {
    try {
      await schedule(postId);
      toast.success('Post scheduled successfully');
      return { success: true };
    } catch (err) {
      toast.error('Failed to schedule post');
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  };
  
  // Handle approve post with feedback
  const handleApprovePost = async (postId: string, notes?: string) => {
    try {
      // Only pass notes if they exist
      if (notes) {
        await approve(postId, notes);
      } else {
        await approve(postId);
      }
      toast.success('Post approved successfully');
      return { success: true };
    } catch (err) {
      toast.error('Failed to approve post');
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <SocialMediaHeader 
        onCreatePost={openCreateDialog} 
        aria-label={screenReaderFriendly ? "Social Media Calendar Header with Create Post button" : undefined}
      />
      
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
        onClearFilters={handleClearFilters}
        aria-label={screenReaderFriendly ? "Social Media Content Filters" : undefined}
      />
      
      {/* View Toggle */}
      <ViewToggle 
        view={view}
        onViewChange={setView}
        postCount={posts.length}
        aria-label={screenReaderFriendly ? "Toggle between list and calendar view" : undefined}
      />
      
      {/* Content Display */}
      <PostsDisplay
        view={view}
        posts={posts}
        isLoading={isLoading}
        error={formattedError}
        currentMonth={currentMonth}
        onEditPost={(post) => console.log('Edit post', post)}
        onDeletePost={handleDeletePost}
        onSchedulePost={handleSchedulePost}
        onApprovePost={handleApprovePost}
        onCreatePost={openCreateDialog}
        aria-label={screenReaderFriendly ? "Social Media Posts List View" : undefined}
      />
      
      {/* Create Post Dialog */}
      <DialogCreate
        open={isCreateDialogOpen}
        onOpenChange={closeCreateDialog}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}
