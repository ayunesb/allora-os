export interface CreatePostInput {
  campaignId: string; // Made required
  isApproved: boolean; // Made required
  tags: string[]; // Made required
  mentions: string[]; // Made required
  hashtags: string[]; // Made required
  location: string; // Made required
  link_url: string; // Made required
  mediaUrls: string[]; // Made required
}
