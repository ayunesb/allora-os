import { SocialMediaPost } from '@/types/socialMedia';
interface PostCardProps {
    post: SocialMediaPost;
    onEdit: () => void;
    onDelete: () => void;
    onSchedule: () => void;
    onApprove: () => void;
}
export declare function PostCard({ post, onEdit, onDelete, onSchedule, onApprove, }: PostCardProps): JSX.Element;
export {};
