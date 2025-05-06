import {
  SocialMediaPost,
  CreatePostInput,
  SocialMediaCalendarFilters,
} from "@/types/unified-types";
export declare const useSocialMedia: () => {
  posts: SocialMediaPost[];
  loading: boolean;
  isLoading: boolean;
  error: string;
  view: "list" | "calendar";
  currentMonth: Date;
  searchQuery: string;
  selectedPlatform: string;
  selectedStatus: string;
  setView: import("react").Dispatch<
    import("react").SetStateAction<"list" | "calendar">
  >;
  setCurrentMonth: import("react").Dispatch<
    import("react").SetStateAction<Date>
  >;
  setSearchQuery: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  setSelectedPlatform: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  setSelectedStatus: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  setPostFilters: (filters: SocialMediaCalendarFilters) => void;
  clearFilters: () => void;
  isCreateDialogOpen: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  createPost: (postData: CreatePostInput) => Promise<void>;
  updatePost: (
    postId: string,
    postData: Partial<SocialMediaPost>,
  ) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  approve: (postId: string) => Promise<void>;
  schedule: (postId: string, scheduledDate?: string) => Promise<void>;
  fetchPosts: (filters?: SocialMediaCalendarFilters) => Promise<void>;
  refreshPosts: () => Promise<void>;
};
export default useSocialMedia;
