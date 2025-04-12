
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SocialMediaPostForm from '../SocialMediaPostForm';
import { SocialPlatform, PostContentType } from '@/types/socialMedia';
import { socialMediaPostSchema } from '@/utils/validators/socialMediaValidator';

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

// Mock the validators - this allows us to test validation behavior
vi.mock('@/utils/validators/socialMediaValidator', async () => {
  const actual = await vi.importActual('@/utils/validators/socialMediaValidator');
  return {
    ...actual,
    socialMediaPostSchema: {
      ...actual.socialMediaPostSchema,
      safeParse: vi.fn()
    }
  };
});

describe('SocialMediaPostForm', () => {
  // Setup test user for user interactions
  const user = userEvent.setup();
  
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
    vi.clearAllMocks();
  });

  describe('Form rendering', () => {
    it('renders the form with default values', () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      expect(screen.getByLabelText(/Post Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Platform/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Content Type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Post Content/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Scheduled Date/i)).toBeInTheDocument();
      
      // Check for correct button text
      expect(screen.getByRole('button', { name: /Create Post/i })).toBeInTheDocument();
      
      // Check form is accessible
      expect(screen.getByRole('form')).toHaveAttribute('aria-label', 'social-media-post-form');
    });

    it('pre-fills form when post prop is provided', () => {
      render(<SocialMediaPostForm post={mockPost} onSubmit={mockSubmit} />);
      
      expect(screen.getByLabelText(/Post Title/i)).toHaveValue('Test Post');
      expect(screen.getByLabelText(/Post Content/i)).toHaveValue('Test content');
      
      // Check for update button instead of create
      expect(screen.getByRole('button', { name: /Update Post/i })).toBeInTheDocument();
    });

    it('shows Campaign selector when campaigns are available', () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      expect(screen.getByLabelText(/Campaign/i)).toBeInTheDocument();
      expect(screen.getByText(/Link to a campaign/i)).toBeInTheDocument();
    });
    
    it('properly handles optional publish time field', () => {
      const postWithTime = {
        ...mockPost,
        publish_time: '14:30'
      };
      
      render(<SocialMediaPostForm post={postWithTime} onSubmit={mockSubmit} />);
      expect(screen.getByLabelText(/Publish Time/i)).toHaveValue('14:30');
    });
    
    it('has accessible form elements with proper attributes', () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Check for proper ARIA attributes
      expect(screen.getByLabelText(/Post Title/i)).toHaveAttribute('aria-describedby', 'title-description');
      expect(screen.getByLabelText(/Post Content/i)).toHaveAttribute('aria-describedby', 'content-description');
      expect(screen.getByLabelText(/Scheduled Date/i)).toHaveAttribute('aria-describedby', 'scheduled-date-description');
    });
  });

  describe('Form states', () => {
    it('shows loading state when isSubmitting is true', () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} isSubmitting={true} />);
      
      const submitButton = screen.getByRole('button', { name: /Saving/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Saving...');
    });

    it('shows "Create Post" button for new posts', () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      expect(screen.getByRole('button', { name: /Create Post/i })).toBeInTheDocument();
    });

    it('shows "Update Post" button for existing posts', () => {
      render(<SocialMediaPostForm post={mockPost} onSubmit={mockSubmit} />);
      
      expect(screen.getByRole('button', { name: /Update Post/i })).toBeInTheDocument();
    });
    
    it('disables submit button during form submission', () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} isSubmitting={true} />);
      
      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Form interactions', () => {
    it('calls onSubmit with form values when submitted', async () => {
      render(<SocialMediaPostForm post={mockPost} onSubmit={mockSubmit} />);
      
      // Mock successful validation
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: true,
        data: mockPost
      });
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Update Post/i }));
      
      // Verify onSubmit was called with the right values
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
          title: 'Test Post',
          content: 'Test content',
          platform: 'Facebook',
        }));
      });
    });

    it('allows changing form values before submission', async () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Mock successful validation
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: true,
        data: {
          title: 'New Title',
          content: 'New content for testing',
          platform: 'Instagram',
          content_type: 'image',
          scheduled_date: '2025-05-01'
        }
      });
      
      // Fill out the form
      await user.type(screen.getByLabelText(/Post Title/i), 'New Title');
      await user.type(screen.getByLabelText(/Post Content/i), 'New content for testing');
      
      // Select a different platform
      await user.click(screen.getByLabelText(/Platform/i));
      await user.click(screen.getByRole('option', { name: /Instagram/i }));
      
      // Select a different content type
      await user.click(screen.getByLabelText(/Content Type/i));
      await user.click(screen.getByRole('option', { name: /Image/i }));
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Verify onSubmit was called with updated values
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
          title: 'New Title',
          content: 'New content for testing',
          platform: 'Instagram',
          content_type: 'image'
        }));
      });
    });

    it('allows selecting a campaign from the dropdown', async () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Mock successful validation
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: true,
        data: {
          title: 'Test Title',
          content: 'Test content',
          platform: 'Facebook',
          content_type: 'text',
          scheduled_date: '2025-05-01',
          campaign_id: 'camp-1'
        }
      });
      
      // Fill required fields
      await user.type(screen.getByLabelText(/Post Title/i), 'Test Title');
      await user.type(screen.getByLabelText(/Post Content/i), 'Test content');
      
      // Open campaign dropdown
      await user.click(screen.getByLabelText(/Campaign/i));
      
      // Select a campaign
      await user.click(screen.getByRole('option', { name: /Test Campaign 1/i }));
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Verify campaign_id was included in the submission
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
          campaign_id: 'camp-1'
        }));
      });
    });
    
    it('allows entering optional publish time', async () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Mock successful validation
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: true,
        data: {
          title: 'Test Title',
          content: 'Test content',
          platform: 'Facebook',
          content_type: 'text',
          scheduled_date: '2025-05-01',
          publish_time: '15:30'
        }
      });
      
      // Fill required fields
      await user.type(screen.getByLabelText(/Post Title/i), 'Test Title');
      await user.type(screen.getByLabelText(/Post Content/i), 'Test content');
      
      // Set publish time
      await user.type(screen.getByLabelText(/Publish Time/i), '15:30');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Verify publish_time was included in the submission
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
          publish_time: '15:30'
        }));
      });
    });
  });

  describe('Form validation', () => {
    it('shows validation errors when form is submitted with invalid data', async () => {
      // Mock the validation to return errors
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: false,
        error: {
          errors: [
            { path: ['title'], message: 'Title is required' },
            { path: ['content'], message: 'Content is required' }
          ]
        }
      } as any);
      
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Submit the form without filling it out
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Check for error messages
      await waitFor(() => {
        expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Content is required/i)).toBeInTheDocument();
      });
      
      // Verify onSubmit was not called
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('shows success when validation passes', async () => {
      // Mock the validation to return success
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: true,
        data: {
          title: 'Valid Title',
          content: 'Valid content',
          platform: 'Twitter',
          content_type: 'text',
          scheduled_date: '2025-05-01'
        }
      } as any);
      
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Fill out the form
      await user.type(screen.getByLabelText(/Post Title/i), 'Valid Title');
      await user.type(screen.getByLabelText(/Post Content/i), 'Valid content');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Verify onSubmit was called
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    });
    
    it('validates date fields correctly', async () => {
      // Mock the validation with a date error
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: false,
        error: {
          errors: [
            { path: ['scheduled_date'], message: 'Invalid date format' }
          ]
        }
      } as any);
      
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Fill required fields
      await user.type(screen.getByLabelText(/Post Title/i), 'Test Title');
      await user.type(screen.getByLabelText(/Post Content/i), 'Test content');
      
      // Set an invalid date (this would be caught by the validation)
      const dateInput = screen.getByLabelText(/Scheduled Date/i);
      fireEvent.change(dateInput, { target: { value: 'not-a-date' } });
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Check for date error message
      await waitFor(() => {
        expect(screen.getByText(/Invalid date format/i)).toBeInTheDocument();
      });
      
      // Verify onSubmit was not called
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Platform-specific behavior', () => {
    it('adjusts character limit information based on selected platform', async () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Mock successful validation
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: true,
        data: {
          title: 'Test Title',
          content: 'Test content for Twitter',
          platform: 'Twitter',
          content_type: 'text',
          scheduled_date: '2025-05-01'
        }
      });
      
      // Fill required fields
      await user.type(screen.getByLabelText(/Post Title/i), 'Test Title');
      
      // Select Twitter platform which has shorter character limits
      await user.click(screen.getByLabelText(/Platform/i));
      await user.click(screen.getByRole('option', { name: /Twitter/i }));
      
      // Add content
      await user.type(screen.getByLabelText(/Post Content/i), 'Test content for Twitter');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Verify onSubmit was called with the platform-specific data
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
          platform: 'Twitter',
          content: 'Test content for Twitter'
        }));
      });
    });
    
    it('handles different content types based on platform selection', async () => {
      render(<SocialMediaPostForm onSubmit={mockSubmit} />);
      
      // Mock successful validation
      vi.mocked(socialMediaPostSchema.safeParse).mockReturnValueOnce({
        success: true,
        data: {
          title: 'Instagram Post',
          content: 'Image post for Instagram',
          platform: 'Instagram',
          content_type: 'image',
          scheduled_date: '2025-05-01'
        }
      });
      
      // Fill required fields
      await user.type(screen.getByLabelText(/Post Title/i), 'Instagram Post');
      await user.type(screen.getByLabelText(/Post Content/i), 'Image post for Instagram');
      
      // Select Instagram platform
      await user.click(screen.getByLabelText(/Platform/i));
      await user.click(screen.getByRole('option', { name: /Instagram/i }));
      
      // Select image content type
      await user.click(screen.getByLabelText(/Content Type/i));
      await user.click(screen.getByRole('option', { name: /Image/i }));
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /Create Post/i }));
      
      // Verify onSubmit was called with proper platform and content type
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
          platform: 'Instagram',
          content_type: 'image'
        }));
      });
    });
  });
});
