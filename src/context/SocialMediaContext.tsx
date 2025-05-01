
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SocialMediaPost, SocialPlatform, ContentType, PostStatus } from '@/types/unified-types';
import { formatISO } from 'date-fns';
import { toast } from 'sonner';

// Define the context interface
interface SocialMediaContextProps {
  posts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
  view: 'list' | 'calendar';
  currentMonth: Date;
  createPost: (post: any) => Promise<void>;
  updatePost: (id: string, updates: any) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  schedule: (id: string) => Promise<void>;
  approve: (id: string) => Promise<void>;
  setView: (view: 'list' | 'calendar') => void;
  setCurrentMonth: (date: Date) => void;
  refreshPosts: () => Promise<void>;
  isCreateDialogOpen: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
}

// Create the context
const SocialMediaContext = createContext<SocialMediaContextProps | undefined>(undefined);

// Provider component
export const SocialMediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  // Load posts on mount
  React.useEffect(() => {
    loadPosts();
  }, []);

  // Load mock posts for demo
  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      const mockPosts: SocialMediaPost[] = [
        {
          id: '1',
          title: 'Product Launch Announcement',
          platform: 'LinkedIn',
          content: 'Excited to announce our new product launch! #innovation #tech',
          content_type: 'text',
          status: 'published',
          is_approved: true,
          scheduled_date: formatISO(new Date()),
          publish_time: '09:00',
          created_at: formatISO(new Date(Date.now() - 86400000)),
          updated_at: formatISO(new Date()),
          company_id: '123',
          media_urls: [],
          link_url: '',
          tags: ['product', 'launch', 'announcement']
        },
        {
          id: '2',
          title: 'Weekly Update',
          platform: 'Twitter',
          content: 'Check out our weekly update on what we\'ve been working on',
          content_type: 'image',
          status: 'scheduled',
          is_approved: true,
          scheduled_date: formatISO(new Date(Date.now() + 86400000 * 2)),
          publish_time: '14:30',
          created_at: formatISO(new Date()),
          updated_at: formatISO(new Date()),
          company_id: '123',
          media_urls: ['https://via.placeholder.com/300'],
          link_url: 'https://example.com/blog',
          tags: ['weekly', 'update']
        },
        {
          id: '3',
          title: 'Draft Post',
          platform: 'Facebook',
          content: 'This is a draft post',
          content_type: 'text',
          status: 'draft',
          is_approved: false,
          scheduled_date: '',
          publish_time: '',
          created_at: formatISO(new Date(Date.now() - 86400000 * 3)),
          updated_at: formatISO(new Date()),
          company_id: '123',
          media_urls: [],
          link_url: '',
          tags: ['draft']
        }
      ];
      
      setPosts(mockPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost: SocialMediaPost = {
        id: `new-${Date.now()}`,
        title: postData.title || 'Untitled Post',
        content: postData.content || '',
        platform: postData.platform || 'LinkedIn',
        content_type: postData.content_type || 'text',
        status: postData.status || 'draft',
        is_approved: postData.is_approved || false,
        scheduled_date: postData.scheduled_date || '',
        publish_time: postData.publish_time || '',
        created_at: formatISO(new Date()),
        updated_at: formatISO(new Date()),
        company_id: postData.company_id || '123',
        media_urls: postData.media_urls || [],
        link_url: postData.link_url || '',
        tags: postData.tags || [],
        campaign_id: postData.campaign_id
      };
      
      setPosts(prevPosts => [...prevPosts, newPost]);
      closeCreateDialog();
      toast.success('Post created successfully');
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing post
  const updatePost = async (id: string, updates: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id 
            ? { ...post, ...updates, updated_at: formatISO(new Date()) } 
            : post
        )
      );
      
      toast.success('Post updated successfully');
    } catch (err) {
      console.error('Error updating post:', err);
      toast.error('Failed to update post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const deletePost = async (id: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Schedule a post
  const schedule = async (id: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id 
            ? { 
                ...post, 
                status: 'scheduled' as PostStatus,
                scheduled_date: post.scheduled_date || formatISO(new Date(Date.now() + 86400000)),
                updated_at: formatISO(new Date()) 
              } 
            : post
        )
      );
      
      toast.success('Post scheduled successfully');
    } catch (err) {
      console.error('Error scheduling post:', err);
      toast.error('Failed to schedule post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Approve a post
  const approve = async (id: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id 
            ? { ...post, is_approved: true, updated_at: formatISO(new Date()) } 
            : post
        )
      );
      
      toast.success('Post approved successfully');
    } catch (err) {
      console.error('Error approving post:', err);
      toast.error('Failed to approve post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh posts
  const refreshPosts = async () => {
    await loadPosts();
  };

  // Dialog control
  const openCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };
  
  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <SocialMediaContext.Provider
      value={{
        posts,
        loading,
        error,
        view,
        currentMonth,
        createPost,
        updatePost,
        deletePost,
        schedule,
        approve,
        setView,
        setCurrentMonth,
        refreshPosts,
        isCreateDialogOpen,
        openCreateDialog,
        closeCreateDialog
      }}
    >
      {children}
    </SocialMediaContext.Provider>
  );
};

// Custom hook to use the social media context
export const useSocialMedia = () => {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
};
