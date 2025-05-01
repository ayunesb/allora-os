
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { 
  SocialMediaPost, 
  SocialPlatform, 
  ContentType, 
  PostStatus, 
  SocialMediaCalendarFilters 
} from '@/types/unified-types';

export interface SocialMediaContextType {
  posts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
  createPost: (post: Partial<SocialMediaPost>) => Promise<void>;
  updatePost: (postId: string, post: Partial<SocialMediaPost>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  approvePost: (postId: string) => Promise<void>;
  schedulePost: (postId: string, scheduledDate: string) => Promise<void>;
  publishPost: (postId: string) => Promise<void>;
  fetchPosts: (filters?: SocialMediaCalendarFilters) => Promise<void>;
}

// Create context with undefined default value
const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

// Provider props interface
export interface SocialMediaProviderProps {
  children: ReactNode;
}

export const SocialMediaProvider: React.FC<SocialMediaProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch posts with optional filters
  const fetchPosts = async (filters?: SocialMediaCalendarFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example API call to fetch posts
      // const response = await api.fetchSocialPosts(filters);
      // setPosts(response.data);
      
      // Simulating API response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPosts: SocialMediaPost[] = [
        {
          id: '1',
          platform: 'LinkedIn',
          content: 'Example LinkedIn post',
          content_type: 'text',
          status: 'draft',
          is_approved: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          platform: 'Twitter',
          content: 'Example Twitter post',
          content_type: 'text',
          status: 'scheduled',
          is_approved: true,
          scheduled_at: new Date(Date.now() + 86400000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      
      setPosts(mockPosts);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new post
  const createPost = async (post: Partial<SocialMediaPost>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example API call to create post
      // const response = await api.createSocialPost(post);
      
      // Simulating API response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost: SocialMediaPost = {
        id: Date.now().toString(),
        platform: post.platform || 'LinkedIn',
        content: post.content || '',
        content_type: post.content_type || 'text',
        status: 'draft',
        is_approved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...post,
      };
      
      setPosts(prevPosts => [...prevPosts, newPost]);
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };
  
  // Update an existing post
  const updatePost = async (postId: string, post: Partial<SocialMediaPost>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example API call to update post
      // const response = await api.updateSocialPost(postId, post);
      
      // Simulating API response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === postId ? { ...p, ...post, updated_at: new Date().toISOString() } : p
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a post
  const deletePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example API call to delete post
      // await api.deleteSocialPost(postId);
      
      // Simulating API response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    } finally {
      setLoading(false);
    }
  };
  
  // Approve a post
  const approvePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example API call to approve post
      // await api.approveSocialPost(postId);
      
      // Simulating API response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === postId ? { ...p, is_approved: true, updated_at: new Date().toISOString() } : p
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to approve post');
    } finally {
      setLoading(false);
    }
  };
  
  // Schedule a post
  const schedulePost = async (postId: string, scheduledDate: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example API call to schedule post
      // await api.scheduleSocialPost(postId, scheduledDate);
      
      // Simulating API response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === postId ? { 
            ...p, 
            status: 'scheduled' as PostStatus, 
            scheduled_at: scheduledDate,
            updated_at: new Date().toISOString() 
          } : p
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to schedule post');
    } finally {
      setLoading(false);
    }
  };
  
  // Publish a post immediately
  const publishPost = async (postId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example API call to publish post
      // await api.publishSocialPost(postId);
      
      // Simulating API response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === postId ? { 
            ...p, 
            status: 'published' as PostStatus, 
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString() 
          } : p
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SocialMediaContext.Provider
      value={{
        posts,
        loading,
        error,
        createPost,
        updatePost,
        deletePost,
        approvePost,
        schedulePost,
        publishPost,
        fetchPosts,
      }}
    >
      {children}
    </SocialMediaContext.Provider>
  );
};

// Custom hook to use the social media context
export const useSocialMedia = (): SocialMediaContextType => {
  const context = useContext(SocialMediaContext);
  
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  
  return context;
};
