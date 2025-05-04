import { SocialMediaPost } from '@/types/unified-types';
interface SocialMediaCalendarViewProps {
    posts: SocialMediaPost[];
    currentMonth: Date;
    onEditPost: (post: SocialMediaPost) => void;
    onDeletePost: (postId: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onSchedulePost: (postId: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onApprovePost: (postId: string, notes?: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
}
/**
 * Calendar view for social media posts
 * Displays posts organized by day in a monthly calendar format
 */
export declare function SocialMediaCalendarView({ posts, currentMonth, onEditPost, onDeletePost, onSchedulePost, onApprovePost }: SocialMediaCalendarViewProps): JSX.Element;
export default SocialMediaCalendarView;
