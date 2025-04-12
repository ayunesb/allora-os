
import { describe, it, expect } from 'vitest';
import { 
  validateSocialMediaPost, 
  validateContentLength, 
  validateHashtags,
  validateMediaUrls,
  socialMediaPostSchema
} from '../socialMediaValidator';
import { testValidationSchema } from '@/utils/testUtils';

describe('socialMediaValidator', () => {
  describe('validateHashtags', () => {
    it('validates correct hashtags', () => {
      expect(validateHashtags(['#marketing', '#business2023', '#growth_strategy'])).toBe(true);
    });

    it('invalidates incorrect hashtags', () => {
      expect(validateHashtags(['marketing', '#business-2023', '##growth'])).toBe(false);
    });

    it('handles non-array inputs', () => {
      expect(validateHashtags('not an array' as any)).toBe(false);
    });
  });

  describe('validateContentLength', () => {
    it('validates content within platform limits', () => {
      const content = 'This is a test post';
      expect(validateContentLength(content, 'Twitter')).toBe(true);
    });

    it('invalidates content exceeding platform limits', () => {
      // Create a string longer than Twitter's 280 character limit
      const longContent = 'a'.repeat(300);
      expect(validateContentLength(longContent, 'Twitter')).toBe(false);
    });
  });

  describe('validateMediaUrls', () => {
    it('validates correct URLs', () => {
      expect(validateMediaUrls([
        'https://example.com/image.jpg',
        'https://media.test.com/video.mp4'
      ])).toBe(true);
    });

    it('invalidates incorrect URLs', () => {
      expect(validateMediaUrls([
        'not-a-url',
        'ftp://invalid-protocol.com/file.txt'
      ])).toBe(false);
    });

    it('handles non-array inputs', () => {
      expect(validateMediaUrls('not an array' as any)).toBe(false);
    });
  });

  describe('socialMediaPostSchema', () => {
    // Use our utility function to test the schema
    testValidationSchema(
      socialMediaPostSchema,
      [
        // Valid cases
        {
          title: 'Test Post',
          content: 'This is a test post content',
          platform: 'Twitter',
          content_type: 'text',
          scheduled_date: '2025-05-01',
          tags: ['#marketing', '#test']
        },
        {
          title: 'Image Post',
          content: 'Check out this image',
          platform: 'Instagram',
          content_type: 'image',
          scheduled_date: '2025-05-01',
          media_urls: ['https://example.com/image.jpg']
        }
      ],
      [
        // Invalid cases
        {
          data: {
            title: 'Te',
            content: 'Content',
            platform: 'Twitter',
            content_type: 'text',
            scheduled_date: '2025-05-01'
          },
          expectedError: 'Title must be at least 3 characters'
        },
        {
          data: {
            title: 'Test',
            content: '',
            platform: 'Twitter',
            content_type: 'text',
            scheduled_date: '2025-05-01'
          },
          expectedError: 'Content is required'
        },
        {
          data: {
            title: 'Test',
            content: 'Content',
            platform: 'NotAPlatform',
            content_type: 'text',
            scheduled_date: '2025-05-01'
          },
          expectedError: 'Invalid enum value'
        }
      ]
    );
  });

  describe('validateSocialMediaPost', () => {
    it('validates a valid post', async () => {
      const result = await validateSocialMediaPost({
        title: 'Valid Post',
        content: 'This is valid content',
        platform: 'Facebook',
        content_type: 'text',
        scheduled_date: '2025-05-01'
      });

      expect(result.valid).toBe(true);
    });

    it('invalidates posts with missing required fields', async () => {
      const result = await validateSocialMediaPost({
        title: 'Missing Fields',
        platform: 'Facebook',
        content_type: 'text',
        // Missing content and scheduled_date
      });

      expect(result.valid).toBe(false);
    });

    it('validates media requirements based on content type', async () => {
      const result = await validateSocialMediaPost({
        title: 'Image Post',
        content: 'This is an image post',
        platform: 'Instagram',
        content_type: 'image',
        scheduled_date: '2025-05-01',
        // Missing media_urls for image type
      });

      expect(result.valid).toBe(false);
      expect(result.message).toContain('require at least one media URL');
    });
  });
});
