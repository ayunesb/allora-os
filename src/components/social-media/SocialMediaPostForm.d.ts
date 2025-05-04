import { SocialMediaPost } from '@/types/fixed/SocialMedia';
interface SocialMediaPostFormProps {
    post?: SocialMediaPost;
    onSubmit: (formData: any) => Promise<{
        success: boolean;
        error?: string;
    }>;
    isSubmitting: boolean;
    onClose?: () => void;
}
declare const SocialMediaPostForm: ({ post, onSubmit, isSubmitting, onClose }: SocialMediaPostFormProps) => JSX.Element;
export default SocialMediaPostForm;
