
import { describe, it, expect } from 'vitest';
import { validateMediaUrls, validateMediaUrl } from '../urlValidators';

describe('urlValidators', () => {
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

  describe('validateMediaUrl', () => {
    it('validates a correct URL', () => {
      expect(validateMediaUrl('https://example.com/image.jpg')).toBe(true);
    });

    it('invalidates an incorrect URL', () => {
      expect(validateMediaUrl('not-a-url')).toBe(false);
    });
  });
});
