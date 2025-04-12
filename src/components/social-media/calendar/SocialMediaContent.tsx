
import React, { FormEvent } from 'react';
import { useSocialMediaContext } from '@/context/SocialMediaContext';
import { SocialMediaHeader } from './SocialMediaHeader';
import { SocialMediaFilters } from './SocialMediaFilters';
import { ViewToggle } from './ViewToggle';
import { PostsDisplay } from '../PostsDisplay';
import { DialogCreate } from '../SocialMediaPostDialog';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import SocialMediaCalendarView from './SocialMediaCalendarView';

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
    ? (error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Unknown error')) 
    : null;
  
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
      )}
      
      {/* Create Post Dialog */}
      <DialogCreate
        open={isCreateDialogOpen}
        onOpenChange={closeCreateDialog}
        onSubmit={createPost}
      />
    </div>
  );
}
