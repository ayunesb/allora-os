export interface SocialMediaPost {
  id: string;
  company_id: string;
  slug: string;
  content: string;
}

export interface CreatePostInput {
	content: string;
	platform: 'facebook' | 'instagram' | 'twitter';
	scheduledAt?: string;
}

export interface UpdatePostInput extends CreatePostInput {
	postId: string;
}

export interface BatchPostResponse {
	success: boolean;
	errors?: string[];
}