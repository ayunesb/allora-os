/**
 * Social Media Validators 
 * 
 * This file re-exports all validators from the restructured socialMedia directory
 * for backwards compatibility.
 */

export * from './socialMedia';

import { CreatePostInput, UpdatePostInput } from '@/types/fixed/SocialMediaPost';

export function validateCreatePost(input: CreatePostInput): boolean {
	return !!input.content && !!input.platform;
}

export function validateUpdatePost(input: UpdatePostInput): boolean {
	return !!input.postId && validateCreatePost(input);
}
