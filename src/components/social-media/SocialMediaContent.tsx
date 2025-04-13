
import React, { FormEvent, Suspense, lazy } from 'react';
import { useSocialMediaContext } from '@/context/SocialMediaContext';
import { SocialMediaHeader } from './calendar/SocialMediaHeader';
import { SocialMediaFilters } from './calendar/SocialMediaFilters';
import { ViewToggle } from './calendar/ViewToggle';
import { PostsDisplay } from './PostsDisplay';
import { DialogCreate } from './SocialMediaPostDialog';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { toast } from 'sonner';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Skeleton } from "@/components/ui/skeleton";
import { standardizeApiResponse } from '@/utils/api/responseHandler';

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
    approve,
    refreshPosts
  } = useSocialMediaContext();
  
  const { screenReaderFriendly } = useAccessibility();
  
  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    setPostFilters({
      platform: selectedPlatform as any || undefined,
      status: selectedStatus as any || undefined,
      search: searchQuery || undefined,
      startDate: format(startOfMonth(currentMonth), 'yyyy-MM-dd'),
      endDate: format(endOfMonth(currentMonth), 'yyyy-MM-dd')
    });
    
    toast.success('Filters applied successfully');
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('');
    setSelectedStatus('');
    clearFilters();
    
    toast.info('Filters have been cleared');
  };
  
  const formattedError = error 
    ? (error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Unknown error')) 
    : null;
  
  const handleCreatePost = async (data: any) => {
    try {
      const result = await createPost(data);
      const response = standardizeApiResponse(result, 'Post created successfully');
      
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      
      return response;
    } catch (err) {
      const errorResponse = standardizeApiResponse(null, 'Failed to create post', err);
      toast.error(errorResponse.message);
      return errorResponse;
    }
  };
  
  const handleDeletePost = async (postId: string) => {
    try {
      const result = await deletePost(postId);
      const response = standardizeApiResponse(result, 'Post deleted successfully');
      
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      
      return response;
    } catch (err) {
      const errorResponse = standardizeApiResponse(null, 'Failed to delete post', err);
      toast.error(errorResponse.message);
      return errorResponse;
    }
  };
  
  const handleSchedulePost = async (postId: string) => {
    try {
      const result = await schedule(postId);
      const response = standardizeApiResponse(result, 'Post scheduled successfully');
      
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      
      return response;
    } catch (err) {
      const errorResponse = standardizeApiResponse(null, 'Failed to schedule post', err);
      toast.error(errorResponse.message);
      return errorResponse;
    }
  };
  
  const handleApprovePost = async (postId: string) => {
    try {
      const result = await approve(postId);
      const response = standardizeApiResponse(result, 'Post approved successfully');
      
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      
      return response;
    } catch (err) {
      const errorResponse = standardizeApiResponse(null, 'Failed to approve post', err);
      toast.error(errorResponse.message);
      return errorResponse;
    }
  };
  
  return (
    <div className="space-y-6">
      <SocialMediaHeader 
        onCreatePost={openCreateDialog} 
        aria-label={screenReaderFriendly ? "Social Media Calendar Header with Create Post button" : undefined}
      />
      
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
      
      <ViewToggle 
        view={view}
        onViewChange={setView}
        postCount={posts.length}
        aria-label={screenReaderFriendly ? "Toggle between list and calendar view" : undefined}
      />
      
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
        onRefresh={refreshPosts}
        aria-label={screenReaderFriendly ? "Social Media Posts List View" : undefined}
      />
      
      <DialogCreate
        open={isCreateDialogOpen}
        onOpenChange={closeCreateDialog}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}
