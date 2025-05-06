import { SocialMediaPost, SocialMediaCalendarFilters } from "@/types";
interface UseFetchPostsOptions {
  initialFilters?: SocialMediaCalendarFilters;
  enabled?: boolean;
}
declare const useFetchPosts: (options?: UseFetchPostsOptions) => {
  posts: SocialMediaPost[];
  loading: boolean;
  isLoading: boolean;
  error: string;
  filters: SocialMediaCalendarFilters;
  updateFilters: (newFilters: SocialMediaCalendarFilters) => void;
  clearFilters: () => void;
  fetchPosts: (newFilters?: SocialMediaCalendarFilters) => Promise<void>;
  refreshPosts: (newFilters?: SocialMediaCalendarFilters) => Promise<void>;
};
export default useFetchPosts;
