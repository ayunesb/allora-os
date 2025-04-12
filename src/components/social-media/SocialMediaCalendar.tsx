
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSocialMedia } from '@/hooks/social/useSocialMedia';
import { SocialMediaPost, SocialPlatform, PostStatus } from '@/types/socialMedia';
import { CalendarIcon, List, Grid, ChevronLeft, ChevronRight, Filter, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import SocialMediaPostForm from './SocialMediaPostForm';
import { DialogCreate } from './SocialMediaPostDialog';
import SocialMediaPostList from './SocialMediaPostList';
import SocialMediaCalendarView from './SocialMediaCalendarView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatters';

/**
 * Social Media Calendar Component
 * Provides a comprehensive view and management system for social media posts
 */
export default function SocialMediaCalendar() {
  const { profile } = useAuth();
  const {
    posts,
    isLoading,
    error,
    filters,
    setPostFilters,
    clearFilters,
    fetchPosts,
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
  
  // Navigation for months
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  // Apply filters on form submission
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setPostFilters({
      platform: selectedPlatform as SocialPlatform || undefined,
      status: selectedStatus as PostStatus || undefined,
      search: searchQuery || undefined,
      startDate: format(startOfMonth(currentMonth), 'yyyy-MM-dd'),
      endDate: format(endOfMonth(currentMonth), 'yyyy-MM-dd')
    });
  };
  
  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('');
    setSelectedStatus('');
    clearFilters();
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Social Media Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Plan, schedule, and manage your social media content
          </p>
        </div>
        
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>
      
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select
              value={selectedPlatform}
              onValueChange={setSelectedPlatform}
            >
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Platforms</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={prevMonth}
                  size="icon"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">
                  {format(currentMonth, 'MMMM yyyy')}
                </span>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={nextMonth}
                  size="icon"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" variant="default" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
              <Button type="button" variant="outline" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <Tabs value={view} onValueChange={(v) => setView(v as 'calendar' | 'list')}>
          <TabsList>
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="mr-2 h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {posts.length > 0 && (
          <Badge variant="outline">
            {posts.length} post{posts.length !== 1 ? 's' : ''}
          </Badge>
        )}
      </div>
      
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
