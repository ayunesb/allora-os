interface SocialMediaCalendarViewProps {
    posts: any[];
    onCreatePost: () => void;
    onEditPost: (postId: string) => void;
    onDeletePost: (postId: string) => void;
}
export declare function SocialMediaCalendarView({ posts, onCreatePost, onEditPost, onDeletePost }: SocialMediaCalendarViewProps): JSX.Element;
export {};
