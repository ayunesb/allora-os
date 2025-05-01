
import React, { FormEvent } from 'react';
import { useSocialMediaContext } from '@/context/SocialMediaContext';
import { SocialMediaHeader } from './SocialMediaHeader';
import { SocialMediaFilters } from './SocialMediaFilters';
import { ViewToggle } from './ViewToggle';
import { PostsDisplay } from '../PostsDisplay';
import { DialogCreate } from '../SocialMediaPostDialog';
import { format, startOfMonth, endOfMonth, isDate } from 'date-fns';

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
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('');
    setSelectedStatus('');
    clearFilters();
  };
  
  // Format the error object correctly for PostsDisplay
  const formattedError = error 
    ? (typeof error === 'object' && error !== null && 'message' in error 
        ? error 
        : new Error(typeof error === 'string' ? error : 'Unknown error')) 
    : null;
  
  // Function to process post data before submission
  const handleCreatePost = (data: any) => {
    // Convert Date objects to strings
    let processedData = { ...data };
    
    // Handle scheduled_date conversion (might be a Date object from a date picker)
    if (processedData.scheduled_date) {
      if (isDate(processedData.scheduled_date)) {
        processedData.scheduled_date = format(processedData.scheduled_date, 'yyyy-MM-dd');
      }
    }
    
    return createPost(processedData);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <SocialMediaHeader onCreatePost={openCreateDialog} />
      
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
      />
      
      {/* View Toggle */}
      <ViewToggle 
        view={view}
        onViewChange={setView}
        postCount={posts.length}
      />
      
      {/* Content Display */}
      <PostsDisplay
        view={view}
        posts={posts}
        isLoading={isLoading}
        error={formattedError}
        currentMonth={currentMonth}
        onEditPost={(post) => console.log('Edit post', post)}
        onDeletePost={deletePost}
        onSchedulePost={schedule}
        onApprovePost={approve}
        onCreatePost={openCreateDialog}
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
