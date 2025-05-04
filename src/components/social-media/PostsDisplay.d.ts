import { SocialMediaPost } from '@/types/socialMedia';
interface PostsDisplayProps {
    view: 'list' | 'calendar';
    posts: SocialMediaPost[];
    currentMonth: Date;
    isLoading: boolean;
    error: Error | null;
    onEditPost: (post: SocialMediaPost) => void;
    onDeletePost: (postId: string) => Promise<any>;
    onSchedulePost: (postId: string) => Promise<any>;
    onApprovePost: (postId: string) => Promise<any>;
    onCreatePost: () => void;
    onRefresh?: () => void;
}
export declare function PostsDisplay({ view, posts, currentMonth, isLoading, error, onEditPost, onDeletePost, onSchedulePost, onApprovePost, onCreatePost, onRefresh, }: PostsDisplayProps): JSX.Element;
export {};
