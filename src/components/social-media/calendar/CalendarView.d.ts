import { SocialMediaPost } from '@/types/socialMedia';
export interface CalendarViewProps {
    posts: SocialMediaPost[];
    currentMonth: Date;
    isLoading?: boolean;
    error?: Error | null;
    onCreatePost: () => void;
    onDeletePost: (postId: string) => Promise<any>;
    onSchedulePost: (postId: string) => Promise<any>;
    onApprovePost: (postId: string) => Promise<any>;
    onEditPost?: (post: SocialMediaPost) => void;
    onRefresh?: () => void;
}
export declare function CalendarView({ posts, currentMonth, onCreatePost, onEditPost, onDeletePost, onSchedulePost, onApprovePost }: CalendarViewProps): JSX.Element;
