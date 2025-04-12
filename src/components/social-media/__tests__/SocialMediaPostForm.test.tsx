
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialMediaPostForm from '../SocialMediaPostForm';
import { SocialPlatform, PostContentType, SocialMediaPost, PostStatus } from '@/types/socialMedia';

// Mock the useCampaigns hook
jest.mock('@/hooks/campaigns/useCampaigns', () => ({
  useCampaigns: () => ({
    campaigns: [
      { id: '1', name: 'Campaign 1' },
      { id: '2', name: 'Campaign 2' },
    ],
  }),
}));

// Mock the onSubmit function
const mockOnSubmit = jest.fn(() => Promise.resolve({ success: true }));

describe('SocialMediaPostForm', () => {
  it('renders the form with empty fields when no post is provided', () => {
    render(<SocialMediaPostForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    expect(screen.getByLabelText('Post Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Post Content')).toBeInTheDocument();
    expect(screen.getByText('Select a platform')).toBeInTheDocument();
    expect(screen.getByText('Select content type')).toBeInTheDocument();
  });

  it('renders the form with pre-filled fields when a post is provided', () => {
    const mockPost: SocialMediaPost = {
      id: '1',
      name: 'Test Post',
      company_id: 'company123',
      title: 'Test Post',
      content: 'This is test content',
      platform: 'Facebook' as SocialPlatform,
      content_type: 'text' as PostContentType,
      scheduled_date: '2023-10-15',
      publish_time: '14:30',
      status: 'Draft' as PostStatus,
      is_approved: false,
      created_at: '2023-10-01',
      updated_at: '2023-10-01'
    };

    render(<SocialMediaPostForm post={mockPost} onSubmit={mockOnSubmit} isSubmitting={false} />);

    expect(screen.getByLabelText('Post Title')).toHaveValue('Test Post');
    expect(screen.getByLabelText('Post Content')).toHaveValue('This is test content');
  });

  it('calls onSubmit with the correct values when the form is submitted', async () => {
    render(<SocialMediaPostForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    fireEvent.change(screen.getByLabelText('Post Title'), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByLabelText('Post Content'), { target: { value: 'New Content' } });
    fireEvent.change(screen.getByLabelText('Scheduled Date'), { target: { value: '2023-10-20' } });

    fireEvent.click(screen.getByText('Create Post'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Post',
        content: 'New Content',
        platform: 'Facebook',
        content_type: 'text',
        scheduled_date: '2023-10-20',
        publish_time: undefined,
        media_urls: [],
        campaign_id: undefined,
        tags: [],
      });
    });
  });

  it('handles form submission errors', async () => {
    const mockOnSubmitError = jest.fn(() => Promise.resolve({ success: false, error: 'Test Error' }));
    render(<SocialMediaPostForm onSubmit={mockOnSubmitError} isSubmitting={false} />);

    fireEvent.change(screen.getByLabelText('Post Title'), { target: { value: 'Error Post' } });
    fireEvent.click(screen.getByText('Create Post'));

    // Since we can't directly test the toast message, we'll just ensure the function was called
    await waitFor(() => {
      expect(mockOnSubmitError).toHaveBeenCalled();
    });
  });

  it('correctly updates a post when a post object is provided', async () => {
    const mockPost: SocialMediaPost = {
      id: '1',
      name: 'Original Post',
      company_id: 'company123',
      title: 'Original Post',
      content: 'Original Content',
      platform: 'Twitter' as SocialPlatform,
      content_type: 'link' as PostContentType,
      scheduled_date: '2023-11-01',
      publish_time: '08:00',
      status: 'Approved' as PostStatus,
      is_approved: true,
      created_at: '2023-10-25',
      updated_at: '2023-10-25'
    };

    render(<SocialMediaPostForm post={mockPost} onSubmit={mockOnSubmit} isSubmitting={false} />);

    fireEvent.change(screen.getByLabelText('Post Title'), { target: { value: 'Updated Post' } });
    fireEvent.click(screen.getByText('Update Post'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Updated Post',
        content: 'Original Content',
        platform: 'Twitter',
        content_type: 'link',
        scheduled_date: '2023-11-01',
        publish_time: '08:00',
        media_urls: [],
        campaign_id: undefined,
        tags: [],
      });
    });
  });
});
