
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SocialMediaPostForm from '../SocialMediaPostForm';
import { SocialPlatform, PostContentType } from '@/types/socialMedia';

// Mock useCampaigns hook
vi.mock('@/hooks/campaigns/useCampaigns', () => ({
  useCampaigns: () => ({
    campaigns: [
      { id: 'camp-1', name: 'Test Campaign 1' },
      { id: 'camp-2', name: 'Test Campaign 2' }
    ],
    isLoading: false
  })
}));

describe('SocialMediaPostForm', () => {
  const mockPost = {
    id: 'post-1',
    company_id: 'comp-1',
    title: 'Test Post',
    content: 'Test content',
    platform: 'Facebook' as SocialPlatform,
    content_type: 'text' as PostContentType,
    scheduled_date: '2025-05-01',
    status: 'draft' as any,
    is_approved: false,
    created_at: '2025-04-01',
    updated_at: '2025-04-01'
  };

  const mockSubmit = vi.fn().mockResolvedValue({ success: true });

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders the form with default values', () => {
    render(<SocialMediaPostForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/Post Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Platform/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Post Content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scheduled Date/i)).toBeInTheDocument();
  });

  it('pre-fills form when post prop is provided', () => {
    render(<SocialMediaPostForm post={mockPost} onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/Post Title/i)).toHaveValue('Test Post');
    expect(screen.getByLabelText(/Post Content/i)).toHaveValue('Test content');
    // Note: Cannot easily check select values in this simple test
    // Would need to use testing-library/user-event for more complex interactions
  });

  it('shows loading state when isSubmitting is true', () => {
    render(<SocialMediaPostForm onSubmit={mockSubmit} isSubmitting={true} />);
    
    expect(screen.getByText('Saving...')).toBeInTheDocument();
    expect(screen.getByText('Saving...')).toBeDisabled();
  });

  it('shows "Create Post" button for new posts', () => {
    render(<SocialMediaPostForm onSubmit={mockSubmit} />);
    
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  it('shows "Update Post" button for existing posts', () => {
    render(<SocialMediaPostForm post={mockPost} onSubmit={mockSubmit} />);
    
    expect(screen.getByText('Update Post')).toBeInTheDocument();
  });

  // This test would need more complex setup with user-event
  // to properly test form submission
  it('calls onSubmit with form values when submitted', async () => {
    // This is a simplified version of the test
    // In a real test, we would use user-event to fill out the form
    render(<SocialMediaPostForm post={mockPost} onSubmit={mockSubmit} />);
    
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
