import { SocialMediaPost } from '@/types/unified-types';
interface SocialMediaPostListProps {
    posts: SocialMediaPost[];
    onEditPost: (post: SocialMediaPost) => void;
    onDeletePost: (id: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onSchedulePost: (id: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onApprovePost: (id: string, notes?: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    "aria-label"?: string;
}
export default function SocialMediaPostList({ posts, onEditPost, onDeletePost, onSchedulePost, onApprovePost, "aria-label": ariaLabel }: SocialMediaPostListProps): JSX.Element;
export {};
