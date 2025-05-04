import { describe, it, expect } from 'vitest';
import { validateHashtags, validateContentLength } from '../contentValidators';
describe('contentValidators', () => {
    describe('validateHashtags', () => {
        it('validates correct hashtags', () => {
            expect(validateHashtags(['#marketing', '#business2023', '#growth_strategy'])).toBe(true);
        });
        it('invalidates incorrect hashtags', () => {
            expect(validateHashtags(['marketing', '#business-2023', '##growth'])).toBe(false);
        });
        it('handles non-array inputs', () => {
            expect(validateHashtags('not an array')).toBe(false);
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
});
