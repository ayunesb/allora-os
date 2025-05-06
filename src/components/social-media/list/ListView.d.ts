import { SocialMediaPost } from "@/types/socialMedia";
interface ListViewProps {
  posts: SocialMediaPost[];
  onEditPost: (post: SocialMediaPost) => void;
  onDeletePost: (postId: string) => Promise<any>;
  onSchedulePost: (postId: string) => Promise<any>;
  onApprovePost: (postId: string) => Promise<any>;
}
export declare function ListView({
  posts,
  onEditPost,
  onDeletePost,
  onSchedulePost,
  onApprovePost,
}: ListViewProps): JSX.Element;
export {};
