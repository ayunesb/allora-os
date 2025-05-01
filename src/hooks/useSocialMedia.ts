
import { useState, useCallback } from 'react';
import { SocialMediaPost, SocialMediaCalendarFilters, SocialPlatform, ContentType, PostStatus } from '@/types/fixed/SocialMedia';
import { toast } from 'sonner';

// Mock data for development
const mockPosts: SocialMediaPost[] = [
  {
    id: '1',
    title: 'Product Launch',
    content: 'Excited to announce our new product!',
    platform: 'LinkedIn',
    content_type: 'text',
    scheduled_date: '2025-05-10',
    publish_time: '09:00',
    media_urls: [],
    link_url: '',
    tags: ['launch', 'product'],
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Company Update',
    content: 'Check out our latest company update!',
    platform: 'Twitter',
    content_type: 'image',
    scheduled_date: '2025-05-15',
    publish_time: '14:00',
    media_urls: ['/placeholder-image.jpg'],
    link_url: 'https://example.com/update',
    tags: ['update', 'news'],
    status: 'draft'
  }
];

export const useSocialMedia = () => {
  const [posts, setPosts] = useState<SocialMediaPost[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const setPostFilters = useCallback((filters: SocialMediaCalendarFilters) => {
    if (filters.searchQuery) setSearchQuery(filters.searchQuery);
    if (filters.platform) setSelectedPlatform(filters.platform);
    if (filters.status) setSelectedStatus(filters.status);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedPlatform('');
    setSelectedStatus('');
  }, []);

  const openCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, []);

  const closeCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(false);
  }, []);

  const fetchPosts = useCallback(async (filters?: SocialMediaCalendarFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In real app, this would be an API call
      setTimeout(() => {
        const filteredPosts = mockPosts.filter(post => {
          if (filters?.searchQuery && 
             !post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
             !post.content.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
            return false;
          }
          if (filters?.platform && post.platform !== filters.platform) {
            return false;
          }
          if (filters?.status && post.status !== filters.status) {
            return false;
          }
          return true;
        });
        
        setPosts(filteredPosts);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch posts');
      setIsLoading(false);
    }
  }, []);

  const refreshPosts = useCallback(async () => {
    await fetchPosts({ searchQuery, platform: selectedPlatform, status: selectedStatus });
    toast.success('Posts refreshed');
  }, [fetchPosts, searchQuery, selectedPlatform, selectedStatus]);

  const createPost = useCallback(async (postData: Partial<SocialMediaPost>) => {
    setIsLoading(true);
    
    try {
      // In real app, this would be an API call
      const newPost: SocialMediaPost = {
        id: Date.now().toString(),
        title: postData.title || '',
        content: postData.content || '',
        platform: postData.platform as SocialPlatform || 'LinkedIn',
        content_type: postData.content_type as ContentType || 'text',
        scheduled_date: postData.scheduled_date || new Date().toISOString().split('T')[0],
        publish_time: postData.publish_time || '09:00',
        media_urls: postData.media_urls || [],
        link_url: postData.link_url || '',
        tags: postData.tags || [],
        is_approved: postData.is_approved || false,
        status: 'draft'
      };
      
      setPosts(prev => [...prev, newPost]);
      setIsLoading(false);
      closeCreateDialog();
      toast.success('Post created successfully!');
    } catch (err) {
      setError('Failed to create post');
      setIsLoading(false);
      toast.error('Failed to create post');
    }
  }, [closeCreateDialog]);

  const updatePost = useCallback(async (postId: string, postData: Partial<SocialMediaPost>) => {
    setIsLoading(true);
    
    try {
      // In real app, this would be an API call
      setPosts(prev => 
        prev.map(post => 
          post.id === postId ? { ...post, ...postData } : post
        )
      );
      setIsLoading(false);
      toast.success('Post updated successfully!');
    } catch (err) {
      setError('Failed to update post');
      setIsLoading(false);
      toast.error('Failed to update post');
    }
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    setIsLoading(true);
    
    try {
      // In real app, this would be an API call
      setPosts(prev => prev.filter(post => post.id !== postId));
      setIsLoading(false);
      toast.success('Post deleted successfully!');
    } catch (err) {
      setError('Failed to delete post');
      setIsLoading(false);
      toast.error('Failed to delete post');
    }
  }, []);

  const approve = useCallback(async (postId: string) => {
    try {
      await updatePost(postId, { is_approved: true });
    } catch (err) {
      setError('Failed to approve post');
      toast.error('Failed to approve post');
    }
  }, [updatePost]);

  const schedule = useCallback(async (postId: string, scheduledDate?: string) => {
    try {
      await updatePost(postId, { 
        status: 'scheduled',
        scheduled_date: scheduledDate || new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      setError('Failed to schedule post');
      toast.error('Failed to schedule post');
    }
  }, [updatePost]);

  return {
    posts,
    loading: isLoading,
    isLoading,
    error,
    view,
    currentMonth,
    searchQuery,
    selectedPlatform,
    selectedStatus,
    setView,
    setCurrentMonth,
    setSearchQuery,
    setSelectedPlatform,
    setSelectedStatus,
    setPostFilters,
    clearFilters,
    isCreateDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    createPost,
    updatePost,
    deletePost,
    approve,
    schedule,
    fetchPosts,
    refreshPosts
  };
};

export default useSocialMedia;
